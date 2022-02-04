import {
  Args,
  Context,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Author } from 'src/tracks/author.model';
import { Track } from './track.model';
import { Module } from './module.model';

@Resolver(() => Track)
export class TracksResolver {
  @Query(() => [Track], { name: 'tracksForHome' })
  getTracksForHome(@Context('dataSources') dataSources) {
    return dataSources.trackAPI.getTracksForHome();
  }

  @Query(() => Track, { name: 'track' })
  getTrackById(
    @Context('dataSources') dataSources,
    @Args('id', { type: () => ID }) id: string,
  ) {
    return dataSources.trackAPI.getTrack(id);
  }

  @ResolveField(() => Author, { name: 'author' })
  getAuthorByTrackId(
    @Parent() parent: Track,
    @Context('dataSources') dataSources,
  ) {
    return dataSources.trackAPI.getAuthor(parent.authorId);
  }

  @ResolveField(() => [Module], { name: 'modules' })
  getModulesByModulesId(
    @Parent() parent: Track,
    @Context('dataSources') dataSources,
  ) {
    return dataSources.trackAPI.getTrackModules(parent.id);
  }
}
