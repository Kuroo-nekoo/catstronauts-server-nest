import { IncrementTrackViewResponse } from './increment-track-view.response';
import {
  Args,
  Context,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Author } from 'src/tracks/author.model';
import { Track } from './track.model';
import { Module } from './module.model';
import { TrackAPI } from './tracks.datasource';

interface IDataSources {
  trackAPI: TrackAPI;
}

@Resolver(() => Track)
export class TracksResolver {
  @Query(() => [Track], { name: 'tracksForHome' })
  getTracksForHome(@Context('dataSources') { trackAPI }) {
    return trackAPI.getTracksForHome();
  }

  @Query(() => Track, { name: 'track' })
  getTrackById(
    @Context('dataSources') { trackAPI }: IDataSources,
    @Args('id', { type: () => ID }) id: string,
  ) {
    return trackAPI.getTrack(id);
  }

  @ResolveField(() => Author, { name: 'author' })
  getAuthorByTrackId(
    @Parent() { authorId }: Track,
    @Context('dataSources') { trackAPI }: IDataSources,
  ) {
    return trackAPI.getAuthor(authorId);
  }

  @ResolveField(() => [Module], { name: 'modules' })
  getModulesByModulesId(
    @Parent() { id }: Track,
    @Context('dataSources') { trackAPI }: IDataSources,
  ) {
    return trackAPI.getTrackModules(id);
  }

  @Mutation(() => IncrementTrackViewResponse)
  async incrementTrackViews(
    @Args('id', { type: () => ID }) id: string,
    @Context('dataSources') { trackAPI }: IDataSources,
  ) {
    try {
      const track = await trackAPI.incrementTrackViews(id);

      return {
        code: 200,
        success: true,
        message: `Successfully incremented number of views for track ${id}`,
        track,
      };
    } catch (err) {
      return {
        code: err.extensions.response.status,
        success: false,
        message: err.extensions.response.body,
        track: null,
      };
    }
  }
}
