import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ default: true })
  isActive: boolean;
}
