import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { AccountService } from './account.service';
import { stat } from 'fs';
import { UserService } from 'src/user/user.service';
import { TokenService } from 'src/token/token.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('account')
export class AccountController {
    constructor(
        private accountService : AccountService,
        private userSerive : UserService,
        private tokenService : TokenService,
        private prisma : PrismaService
    ){}

    @Post('login')
    async onlogin(@Body() data : any){
        await this.accountService.onlogin(data);
    }

    @Get('auth/callback')
    async handleAuthCallBack(@Query('code') code : string, @Res() res){
        const token = await this.accountService.getTokenFromCode(code);
        
        res.redirect(process.env.Frontend_Url)
    }



    @Post('token')
    async gotoWord(@Body() data : any){
        const token = await this.accountService.getToken(data.id);

        return token;
    }

    @Get('profile')
    async userprofile(){
        const userInfo = await this.accountService.getUserProfile();
        await this.userSerive.saveUserData(userInfo);

        return userInfo;
    }

    
    @Post('logout')
    async onlogout(@Body() data : any){
        try{
            await this.tokenService.logoutUser(data.userId);

            await this.prisma.licences.update({
                where : { userId : data.userId },
                data : { active : false }
            })

            // this.accountService.invalidatetoken();
        }catch(err){
            console.log(err);
        }
        
    }

    @Get('auth/logout')
    async onauthlogout( @Query() status : any){
       console.log(status, "log status.")
    }
    
}
