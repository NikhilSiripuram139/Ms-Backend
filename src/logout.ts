// import { Injectable } from '@nestjs/common';
// import { Cron } from '@nestjs/schedule';

// @Injectable()
// export class TokenService {

//   constructor(private readonly authService: AuthService) {}

//   // This cron job runs every 5 minutes to check token validity
//   @Cron('*/5 * * * *')
//   async checkTokens() {
//     const tokens = await this.authService.getAllTokens();  // Get all user tokens

//     for (const tokenInfo of tokens) {
//       const { accessToken, refreshToken, tokenExpiration } = tokenInfo;
//       const currentTime = Date.now();

//       if (currentTime >= tokenExpiration - (5 * 60 * 1000)) {  // Check if token is expiring in the next 5 minutes
//         const isTokenRefreshed = await this.authService.refreshToken(refreshToken);

//         if (!isTokenRefreshed) {
//           await this.authService.logoutUser(tokenInfo.userId);  // Log out the user if token couldn't be refreshed
//         }
//       }
//     }
//   }
// }






// // auth.service.ts
// import { HttpService } from '@nestjs/axios';
// import { Injectable } from '@nestjs/common';
// import { firstValueFrom } from 'rxjs';
// import * as qs from 'qs';

// @Injectable()
// export class AuthService {
//   constructor(private readonly httpService: HttpService) {}

//   async refreshToken(refreshToken: string): Promise<boolean> {
//     const tokenUrl = `https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/token`;

//     const data = qs.stringify({
//       client_id: this.clientId,
//       client_secret: this.clientSecret,
//       grant_type: 'refresh_token',
//       refresh_token: refreshToken,
//       redirect_uri: this.redirectUri,
//     });

//     try {
//       const response = await firstValueFrom(
//         this.httpService.post(tokenUrl, data, {
//           headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//         }),
//       );
//       const { access_token, expires_in, refresh_token } = response.data;

//       // Update the token in your database
//       const tokenExpiration = Date.now() + (expires_in * 1000);
//       await this.updateTokenInDatabase(access_token, refresh_token, tokenExpiration);
//       return true;
//     } catch (error) {
//       console.error('Error refreshing token:', error);
//       return false;
//     }
//   }

//   // Mock function to update token in database
//   async updateTokenInDatabase(accessToken: string, refreshToken: string, tokenExpiration: number) {
//     // Update the tokens in the user's database record
//     console.log('Token updated:', { accessToken, refreshToken, tokenExpiration });
//   }
// }







// async logoutUser(userId: string) {
//     // Invalidate the token in your database for the user
//     await this.invalidateUserTokens(userId);
  
//     // Optionally, redirect the user to the login page
//     console.log(`User ${userId} logged out due to token expiration.`);
//   }
  
//   async invalidateUserTokens(userId: string) {
//     // Invalidate user tokens in your database
//     console.log(`Invalidating tokens for user ${userId}`);
//     // Implementation here
//   }

  






//   async revokeToken(token: string) {
//     const revokeUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/logout`;
//     const data = qs.stringify({
//       token,
//       client_id: this.clientId,
//       client_secret: this.clientSecret,
//     });
  
//     try {
//       await firstValueFrom(this.httpService.post(revokeUrl, data, {
//         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//       }));
//       console.log('Token revoked successfully.');
//     } catch (error) {
//       console.error('Error revoking token:', error);
//     }
//   }
  