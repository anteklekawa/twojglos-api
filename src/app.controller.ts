import { Body, Controller, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateProjectDto } from './dtos/create-project.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { Response } from 'express';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.appService.createUser(createUserDto);
  }

  @Post('/login')
  async userLogin(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const data = await this.appService.userLogin(loginUserDto);
    response.cookie('userData', data);
  }

  @Post('/delete-user/:userId')
  deleteUser(@Param('userId') userId: number) {
    return this.appService.deleteUser(userId);
  }

  @Post('/create-project')
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.appService.createProject(createProjectDto);
  }

  @Post('/delete-project/:projectId')
  deleteProject(@Param('projectId') projectId: number) {
    return this.appService.deleteProject(projectId);
  }

  @Post('/approve-project/:projectId')
  approveProject(@Param('projectId') projectId: number) {
    return this.appService.approveProject(projectId);
  }

  @Get('/fetch-project/:projectId')
  fetchProject(@Param('projectId') projectId: number) {
    return this.appService.fetchProject(projectId);
  }

  @Get('/fetch-projects/:city')
  fetchProjects(@Param('city') city: string) {
    return this.appService.fetchProjects(city);
  }

  @Post('/vote/:projectId')
  projectVote(@Param('projectId') projectId: number) {
    return this.appService.projectVote(projectId);
  }

  @Get('/settings/:userId')
  getSettings(@Param('userId') userId: number) {
    return this.appService.getSettings(userId);
  }

  @Post('/settings/:userId')
  saveSettings(@Param('userId') userId: number, @Body('theme') theme: string) {
    return this.appService.saveSettings(userId, theme);
  }
}
