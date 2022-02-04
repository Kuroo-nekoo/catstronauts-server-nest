import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Track } from './track.model';

@ObjectType()
export class IncrementTrackViewResponse {
  @Field(() => Int)
  code: number;

  @Field()
  success: boolean;

  @Field()
  message: string;

  @Field(() => Track)
  track: Track;
}
