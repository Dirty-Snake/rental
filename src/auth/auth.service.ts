import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { AuthTokenInterface } from './interfaces/auth-token.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async signIn(username: string, pass: string): Promise<AuthTokenInterface> {
    const user = await this.usersService.findUser(username);
    const checkPassword = await this.usersService.comparePassword(
      pass,
      user.password,
    );
    if (!checkPassword) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return await this.generateTokens(<User>result);
  }
  async generateTokens(user: User): Promise<AuthTokenInterface> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        {
          secret: this.configService.get<string>('ACCESS_SECRET'),
          expiresIn: '7d',
        },
      ),
      this.jwtService.signAsync(
        {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        {
          secret: this.configService.get<string>('REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
  async refreshToken(token: string): Promise<AuthTokenInterface> {
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('REFRESH_SECRET'),
      });
      return this.generateTokens(payload);
    } catch {
      throw new UnauthorizedException();
    }
  }
}
