import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { AppRepository } from './app.repository';
import { CreateProjectDto } from './dtos/create-project.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { WASI } from 'wasi';

@Injectable()
export class AppService {
  constructor(private readonly appRepository: AppRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    createUserDto.isGov = false;
    return await this.appRepository.createUser(createUserDto);
  }

  async createProject(createProjectDto: CreateProjectDto) {
    createProjectDto.isApproved = false;
    createProjectDto.votes = 0;
    createProjectDto.city = createProjectDto.city.toLowerCase();
    if (createProjectDto.userId == -1 || !createProjectDto.userId)
      throw new UnauthorizedException('You are not logged in!');
    return await this.appRepository.createProject(createProjectDto);
  }

  async deleteUser(userId: number) {
    return await this.appRepository.deleteUser(userId);
  }

  async deleteProject(projectId: number) {
    return await this.appRepository.deleteProject(projectId);
  }

  async approveProject(projectId: number) {
    return await this.appRepository.approveProject(projectId);
  }

  async fetchProjects(city) {
    const projects = await this.appRepository.fetchProjects(city);
    return projects.map((project) => {
      const coords = { lat: project.lat, lng: project.lng };
      delete project.lng, project.lat;
      return { ...project, coords };
    });
  }

  async fetchUserProjects(userId: number) {
    const userProjects = await this.appRepository.fetchUserProjects(userId);
    const data = [];

    const getProject = async (projectId) => {
      return new Promise(async (resolve, reject) => {
        resolve(await this.appRepository.fetchProject(projectId, userId));
      });
    };

    for (const userProject of userProjects) {
      data.push(await getProject(userProject.projectId));
    }

    return data.map((dataset) => {
      const coords = { lat: dataset.project.lat, lng: dataset.project.lng };

      delete dataset.project.lng, dataset.project.lat;

      return {
        ...dataset?.project,
        ...dataset?.voted,
        coords,
      };
    });
  }

  async fetchProject(projectId: number, userId: number) {
    const data = await this.appRepository.fetchProject(projectId, userId);
    const coords = { lat: data.project.lat, lng: data.project.lng };
    delete data.project.lng, data.project.lat;
    return {
      ...data.project,
      coords,
      voted: data.voted,
      isAuthor: data.isAuthor,
    };
  }

  async userLogin(loginUserDto: LoginUserDto) {
    const res = await this.appRepository.userLogin(loginUserDto);
    if (res) {
      const censor_phone = res.phone.split('');
      for (let i = 4; i < res.phone.length - 2; i++) {
        if (censor_phone[i] == ' ') {
          i++;
        }
        censor_phone[i] = '*';
      }
      res.phone = censor_phone.join('');
    }

    return res;
  }

  async projectVote(projectId: number, userId: number) {
    return await this.appRepository.projectVote(projectId, userId);
  }

  async getSettings(userId: number) {
    return await this.appRepository.getSettings(userId);
  }

  async saveSettings(userId: number, theme: string) {
    return await this.appRepository.saveSettings(userId, theme);
  }
}
