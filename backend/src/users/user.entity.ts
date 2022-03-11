/* eslint-disable prettier/prettier */

import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  roles: string;

  @Column({ nullable: true })
  refreshToken: string;
}
