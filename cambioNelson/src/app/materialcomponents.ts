import {MatButtonModule, MatCheckboxModule} from '@angular/material';


@NgModule({
    imports: [MatButtonModule, MatCheckboxModule,],
    exports: [MatButtonModule, MatCheckboxModule, ],
  })
  export class MaterialModule { }