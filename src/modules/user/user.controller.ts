/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { LoggedManager } from '../auth/decorator/logged-manager.decorator';
import { LoggedUser } from '../auth/decorator/logged-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import {
  GetUserByIdDto,
  UpdateUserRole,
  UserEmailDto,
} from './dto/get-user.dto';
import { UpdateMyAccountDto } from './dto/update-my-account.dto';
import {
  CreatePasswordHashDto,
  UpdateMyPasswordDto,
} from './dto/update-my-password.dto';
import { UserEntity } from './entity/user.entity';
import {
  CreateUserService,
  DeleteMyAccountService,
  FindAllUsersService,
  FindUserByIdService,
  MyAccountService,
  RecoveryPasswordByEmail,
  UpdateMyAccountService,
  UpdateMyPasswordService,
  UpdatePasswordByEmailService,
  UpdateUserRoleById,
} from './services';

@ApiTags()
@Controller()
export class UserController {
  constructor(
    private createUserService: CreateUserService,
    private myAccountService: MyAccountService,
    private updateMyPasswordService: UpdateMyPasswordService,
    private updateMyAccountService: UpdateMyAccountService,
    private deleteMyAccountService: DeleteMyAccountService,
    private findUserByIdService: FindUserByIdService,
    private findAllUsersService: FindAllUsersService,
    private updateUserRoleById: UpdateUserRoleById,
    private recoveryPasswordByEmail: RecoveryPasswordByEmail,
    private updatePasswordByEmailService: UpdatePasswordByEmailService,
  ) {}

  // ============================ Permissões LoggedManager ==========================

  @ApiTags('User')
  @Post('/admin/create-user') //Owner ou Manager Criam usuários
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create an User. - (Manager)',
  })
  async createUser(
    @LoggedManager() user: UserEntity,
    @Body() dto: CreateUserDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.createUserService.execute(dto);
    return res.status(status).send(data);
  }

  @Get('/user/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get an User by id. - (Manager)',
  })
  async getUserById(
    @LoggedManager() user: UserEntity,
    @Param() { id }: GetUserByIdDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.findUserByIdService.execute(+id);

    return res.status(status).send(data);
  }

  @Get('user')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all Users. - (Manager)',
  })
  async findAllUsers(@LoggedManager() user: UserEntity, @Res() res: Response) {
    const { status, data } = await this.findAllUsersService.execute();

    return res.status(status).send(data);
  }

  @Delete('user/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete user account. - (Manager)',
  })
  async deleteAccount(
    @LoggedManager() user: UserEntity,
    @Param() { id }: GetUserByIdDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.deleteMyAccountService.execute(+id);

    return res.status(status).send(data);
  }

  @Patch('update-role/:id')
  @ApiOperation({
    summary: 'Update user role. - (Manager)',
  })
  async updateUserRole(
    @LoggedManager() user: UserEntity,
    @Param() { id }: GetUserByIdDto,
    @Body() { role }: UpdateUserRole,
    @Res() res: Response,
  ) {
    const { status, data } = await this.updateUserRoleById.execute(+id, role);

    return res.status(status).send(data);
  }

  // ============================ Permissões LoggedUser ==========================
  @ApiTags('My account')
  @Get('/my-account') //Perfil de quem está logado
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Return logged user`s profile. - (User`s but Customer)',
  })
  async myAccount(@LoggedUser() user: UserEntity, @Res() res: Response) {
    const { status, data } = await this.myAccountService.execute(user.id);
    return res.status(status).send(data);
  }

  @ApiTags('My account')
  @Put('/my-account') //Update Password
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Upddates logged User`s password. - (User`s but Customer)',
  })
  async updateMyPassword(
    @LoggedUser() user: UserEntity,
    @Body() dto: UpdateMyPasswordDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.updateMyPasswordService.execute(
      dto,
      user.id,
    );
    return res.status(status).send(data);
  }

  @ApiTags('My account')
  @Patch('/my-account') //Update nome ou imagem da conta
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Upddates logged User`s name or image. - (User`s but Customer)',
  })
  async updateMyAccount(
    @LoggedUser() user: UserEntity,
    @Body() dto: UpdateMyAccountDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.updateMyAccountService.execute(
      dto,
      user.id,
    );
    return res.status(status).send(data);
  }

  @Patch('recovery-password')
  @ApiOperation({
    summary: 'Send email to recovery password',
  })
  async recoveryPasswordSendEmail(
    @Body() { email }: UserEmailDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.recoveryPasswordByEmail.execute(email);

    return res.status(status).send(data);
  }

  @Patch('update_password')
  @ApiOperation({
    summary: 'User update password- (FOR ALL USERS).',
  })
  updatePassword(@Body() updatePassword: CreatePasswordHashDto) {
    return this.updatePasswordByEmailService.execute(updatePassword);
  }

  @ApiTags('My account')
  @Delete('/my-account') //Deleta a conta do usuário logado
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete logged user`s account - (User`s but Customer)',
  })
  async DeleteMyAccount(@LoggedUser() user: UserEntity, @Res() res: Response) {
    const { status, data } = await this.deleteMyAccountService.execute(user.id);
    return res.status(status).send(data);
  }
}
