import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path/posix';
import { TrackAPI } from './tracks/tracks.datasource';
import { TracksModule } from './tracks/tracks.module';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd() + '/src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      dataSources: () => {
        return {
          trackAPI: new TrackAPI(),
        };
      },
    }),
    TracksModule,
  ],
})
export class AppModule {}
