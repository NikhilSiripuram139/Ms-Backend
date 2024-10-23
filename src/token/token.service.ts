import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import * as qs from 'qs';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TokenService {
    constructor(
        private readonly httpService: HttpService,
        private readonly prisma: PrismaService
    ) { }

    clientId = process.env.CLIENT_ID;
    clientSecret = process.env.CLIENT_SECRET;
    redirectUri = process.env.REDIRECT_URI;
    tenantId = process.env.TENANT_ID;
    tokens = [];
    count = 0;


    // This cron job runs every 5 minutes to check token validity
    @Cron('*/5 * * * *')
    async checkTokens() {
        this.count++;
        const users = await this.prisma.licences.findMany();  // Get all user

        for (let user of users) {

            const currentTime = Date.now();

            // console.log("from tokenservice", user.token)
            let refresh_token: string;

            if (typeof user.token === 'object' && user.token !== null) {
                refresh_token = user.token['refresh_token'] as string;  // Safely cast as string

                const tokenExpiration = user.token_expiry.getTime();

                if (currentTime >= tokenExpiration - (5 * 60 * 1000)) {  // Check if token is expiring in the next 5 minutes
                    const isTokenRefreshed = await this.refreshToken(refresh_token, user);

                    if (!isTokenRefreshed) {
                        await this.logoutUser(user.userId);  // Log out the user if token couldn't be refreshed
                    }
                }

            } else {
                return;
            }
        }

    }

    async refreshToken(refreshToken: string, user: any): Promise<boolean> {
        const tokenUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/token`;

        const params = new URLSearchParams();
        params.append('client_id', this.clientId);
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', refreshToken);
        params.append('client_secret', this.clientSecret);
        params.append('scope', 'User.Read offline_access'); // Adjust scope as needed


        try {
            const response = await firstValueFrom(
                this.httpService.post(tokenUrl, params)
            );
            const token = response.data;
            // console.log("New refresh Token", token)
            const { expires_in } = response.data;

            // Update the token in your database
            const tokenExpiration = new Date(Date.now() + (expires_in * 1000));
            await this.updateTokenInDatabase(token, tokenExpiration, user);
            return true;
        } catch (error) {
            console.error('Error refreshing token:', error);
            return false;
        }
    }

    // Mock function to update token in database
    async updateTokenInDatabase(token: any, tokenExpiry: Date, user: any) {
        // Update the tokens in the user's database record
        const currentuser = await this.prisma.licences.findUnique({
            where: { id: user.id }
        })

        if (currentuser) {
            await this.prisma.licences.update({
                where: { id: (await currentuser).id },
                data: { token: token, token_expiry: tokenExpiry, active: true }
            })
        }

        console.log('Token updated:', this.count);
    }


    async logoutUser(userId: string) {
        // Invalidate the token in your database for the user
        await this.invalidateUserTokens(userId);

        // Optionally, redirect the user to the login page
        console.log(`User ${userId} logged out due to token expiration.`);
    }

    async invalidateUserTokens(userId: string) {
        // Invalidate user tokens in your database
        try {

            const currentuser = await this.prisma.licences.findUnique({
                where: { userId: userId }
            })

            if (currentuser) {
                await this.prisma.licences.update({
                    where: { id: currentuser.id },
                    data: { token: null, token_expiry: new Date(Date.now()), active: false }
                })
            }

            console.log(`Invalidating tokens for user ${userId}`);
        } catch (err) {
            console.log(err);
        }

    }

}
