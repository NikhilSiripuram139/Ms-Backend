import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleInit, Scope } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import axios, { AxiosResponse } from 'axios';
import * as qs from 'qs';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class AccountService implements OnModuleInit {

    constructor(
        private httpService: HttpService,
        private prisma: PrismaService,
    ) { }

    private clientId = process.env.CLIENT_ID;
    private clientSecret = process.env.CLIENT_SECRET;
    private redirectUri = process.env.REDIRECT_URI;
    private tenantId = process.env.TENANT_ID;

    private token: any;
    users: any[];
    currentUser: any;
    previousUser: any;

    async onModuleInit() {
        // console.log(this.token);
        this.users = await this.prisma.licences.findMany();
    }


    async onlogin(data: any) {
        this.currentUser = data;
    }


    async getTokenFromCode(code: string) {

        const tokenUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/token`;


        const params = new URLSearchParams();
        params.append('client_id', this.clientId);
        params.append('scope', 'User.Read offline_access');
        params.append('code', code); // The authorization code you received
        params.append('redirect_uri', this.redirectUri);
        params.append('grant_type', 'authorization_code');
        params.append('client_secret', this.clientSecret);

        try {


            const response = await firstValueFrom(
                this.httpService.post(tokenUrl, params),
            );
            const { access_token, refresh_token, expires_in } = response.data;  // Contains access token, refresh token, etc.

            this.token = { access_token, refresh_token, expires_in };
            console.log(this.token)

            if (this.token) {

                let expiryTime = new Date(Date.now() + this.token.expires_in * 1000);

                const user = await this.prisma.licences.update({
                    where: { userId: (await this.currentUser).userId },
                    data: { active: true, token: this.token, token_expiry: expiryTime }
                })


                this.previousUser = await this.prisma.licences.findUnique({
                    where: { userId: user.userId }
                })

            } else {
                return
            }
            

            console.log(access_token, refresh_token, expires_in)

        } catch (error) {
            console.log('Error data:', error.response?.data);
            throw new Error('Failed to exchange code for token');
        }
    }


    async getToken(id: any) {

        let user = await this.prisma.licences.findUnique({
            where: { userId: id }
        })


        if (user) {

            if (this.currentUser.userId = id) {
                const currentUser = await this.prisma.licences.findUnique({
                    where: { userId : user.userId}
                })

                return currentUser.token;
            } else {
                return;
            }

        } else {
            console.log("Login first!")
        }
    }

    // async invalidatetoken(){
    //     this.token = null;
    // }


    private graphUrl = 'https://graph.microsoft.com/v1.0/me';

    // Fetch user info using access token
    async getUserProfile() {
        try {
            // Make a GET request to Microsoft Graph API
            const response = await axios.get(this.graphUrl, {
                headers: {
                    Authorization: `Bearer ${this.token.access_token}`, // Use Bearer token
                },
            });

            // Return the user profile data
            return response.data; // Contains user profile information
        } catch (error) {
            // Handle any errors (token expired, etc.)
            throw new Error(`Unable to fetch user profile: ${error.message}`);
        }


    }


}
