import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { cargarUsuario } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent {

  usuario!: Usuario | null;

  constructor( 
    private router: ActivatedRoute,
    private store: Store<AppState> ) { }

  ngOnInit(): void {

    this.store.select('usuario').subscribe( ({ user, loading, loaded }) => {
      this.usuario = user;
    } );

    this.router.params
      .subscribe(( { id } ) => {
        console.log(id);
        this.store.dispatch( cargarUsuario({ id }) );
      });
  }

}
