import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Author } from 'src/tracks/author.model';
import { Module } from './module.model';

@ObjectType()
export class Track {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  authorId: string;

  @Field(() => Author)
  author: Author;

  @Field({ nullable: true })
  thumbnail: string;

  @Field(() => Int, { nullable: true })
  length: number;

  @Field(() => Int, { nullable: true })
  modulesCount: number;

  @Field({ nullable: true })
  description: string;

  @Field(() => Int, { nullable: true })
  numberOfViews: number;

  @Field(() => [Module])
  modules: Module[];
}
