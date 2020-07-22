import { Body, Controller, Get, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices'; 
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

@Controller()
export class AppController {
  constructor( 
     private readonly authService: AuthService
  ) { }


  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {

    console.log(req.user)

    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
 