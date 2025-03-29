import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Get('init')
  async init() {
    await this.userService.initData();
    return 'done'
  }

  @Get('follow-relationship')
  async followRelationShip(@Query('id') id: string) {
    if (!id) {
      throw new BadRequestException('userId 不能为空');
    }
    return this.userService.getFollowRelationship(+id);
  }
}
