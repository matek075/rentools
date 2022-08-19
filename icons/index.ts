import { library, config } from '@fortawesome/fontawesome-svg-core';

// import brandIcons from './brands';
// import solidIcons from './solid';
// import regularIcons from './regular';
import lightIcons from './light';

// brandIcons.forEach((item) => library.add(item));
// solidIcons.forEach((item) => library.add(item));
// regularIcons.forEach((item) => library.add(item));
lightIcons.forEach((item) => library.add(item));

config.autoAddCss = false;
