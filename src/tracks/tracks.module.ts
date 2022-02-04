import { Module } from '@nestjs/common';
import { TracksResolver } from './tracks.resolver';

@Module({
  providers: [TracksResolver],
})
export class TracksModule {}
