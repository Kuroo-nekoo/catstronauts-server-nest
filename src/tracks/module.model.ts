import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Module {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field(() => Int, { nullable: true })
  length: number;
}
