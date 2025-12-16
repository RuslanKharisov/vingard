import * as migration_20251209_194803 from './20251209_194803';
import * as migration_20251216_085104 from './20251216_085104';
import * as migration_20251216_090639 from './20251216_090639';

export const migrations = [
  {
    up: migration_20251209_194803.up,
    down: migration_20251209_194803.down,
    name: '20251209_194803',
  },
  {
    up: migration_20251216_085104.up,
    down: migration_20251216_085104.down,
    name: '20251216_085104',
  },
  {
    up: migration_20251216_090639.up,
    down: migration_20251216_090639.down,
    name: '20251216_090639'
  },
];
