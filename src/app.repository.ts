import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { create } from 'domain';
import { LoginUserDto } from './dtos/login-user.dto';
import { log } from 'util';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class AppRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.prismaService.users.create({
      data: {
        email: createUserDto.email,
        password: createUserDto.password,
        city: createUserDto.city,
        pesel: createUserDto.pesel,
        name: createUserDto.name,
        surname: createUserDto.surname,
        phone: createUserDto.phone,
        isGov: createUserDto.isGov,
      },
    });
    if (!user) {
      throw new Error('Failed to register!');
    } else return { Status: 'Success!', user };
  }

  async createProject(createProjectDto) {
    const project = await this.prismaService.projects.create({
      data: {
        title: createProjectDto.title,
        author: createProjectDto.author,
        cost: createProjectDto.cost,
        votes: createProjectDto.votes,
        project_size: createProjectDto.project_size,
        city: createProjectDto.city,
        localization: createProjectDto.localization,
        description: createProjectDto.description,
        isApproved: createProjectDto.isAproved,
      },
    });
    if (!project) {
      return 'Failed!';
    } else return 'Success!\n' + project;
  }

  async deleteUser(userId: number) {
    const id = parseInt(String(userId));
    await this.prismaService.users.delete({
      where: { id },
    });
  }

  async deleteProject(projectId: number) {
    const id = parseInt(String(projectId));
    await this.prismaService.projects.delete({
      where: { id },
    });
  }

  async approveProject(projectId: number) {
    const id = parseInt(String(projectId));
    await this.prismaService.projects.update({
      where: { id },
      data: {
        isApproved: true,
      },
    });
  }

  async fetchProjects(city) {
    return await this.prismaService.projects.findMany({
      where: { isApproved: true, city },
    });
  }

  async fetchProject(projectId: number) {
    const id = parseInt(String(projectId));
    return await this.prismaService.projects.findFirst({
      where: { id },
    });
  }

  async userLogin(loginUserDto: LoginUserDto) {
    const user = await this.prismaService.users.findMany({
      where: {
        OR: [{ email: loginUserDto.login }, { phone: loginUserDto.login }],
        AND: [{ password: loginUserDto.password }],
      },
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        phone: true,
        city: true,
      },
    });

    if (user) {
      return user[0];
    } else {
      throw new Error('Błędny login lub hasło!');
    }
  }

  async projectVote(projectId) {
    const id = parseInt(String(projectId));
    await this.prismaService.projects.update({
      where: { id },
      data: { votes: { increment: 1 } },
    });
    return 'Your vote has been submitted!';
  }

  async getSettings(userId: number) {
    const id = parseInt(String(userId));
    return this.prismaService.users.findUnique({
      where: { id },
      select: { theme: true },
    });
  }

  async saveSettings(userId: number, theme: string) {
    const id = parseInt(String(userId));
    this.prismaService.users.update({
      where: { id },
      data: { theme },
    });
    return 'Success! Your preferences has been changed!';
  }
}
