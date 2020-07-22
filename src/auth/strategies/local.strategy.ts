import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
 

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('USERS_SERVICE') private readonly clientUsers: ClientProxy,) {
    super();
  }

  async validate(username: string, password: string): Promise<any> { 

    const user = await this.clientUsers
      .send({ ACTION_TYPE: 'GET' }, { username: username, password: password })
      // pipe(timeout(5000))
      .toPromise<any>();;

    console.log(user)

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
