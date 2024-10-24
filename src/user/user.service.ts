import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(
        // private accountService : AccountService,
        private prisma : PrismaService,
    ){}

    async getAllUsers(){
        const users = await this.prisma.licences.findMany();
        return users;
    }

    async saveUserData(userInfo : any){
        let useremail : string = userInfo.mail;
        return await this.prisma.licences.upsert({
            where : { userId : useremail },
            update : { active : true},
            create: {
                id: userInfo.id,
                userId: userInfo.mail,
                displayName: userInfo.displayName,
                active: true,
            },
        });
    };


    async updateUserData(email : string){
        await this.prisma.licences.update({
            where : { userId : email },
            data : { active : false }
        });

        const user = await this.prisma.licences.findUnique({
            where :  { userId : email}
        })

        if(user){
            return user.active;
        }else{
            return "UNKNOWN ERROR OCCUERED!";
        }
    };

}
