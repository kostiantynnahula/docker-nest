import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthEntity } from 'src/auth/entities/auth.entity';
import { HashService } from 'src/users/hash.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private hashService: HashService,
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const matchPasswords = await this.hashService.compare(
      user.password,
      password,
    );

    if (matchPasswords) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}
