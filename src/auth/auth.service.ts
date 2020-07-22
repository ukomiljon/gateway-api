import { Inject, Injectable } from '@nestjs/common'; 
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor( 
    private readonly jwtService: JwtService,
    @Inject('USERS_SERVICE') private readonly clientUsers: ClientProxy,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {

const user = await this.clientUsers
      .send({ ACTION_TYPE: 'GET' }, { username: username, password: password })
      // pipe(timeout(5000))
      .toPromise<any>();;
 
      if (user && user.password === password) {
        const { password, ...result } = user;
        return result;
      } 
 
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
