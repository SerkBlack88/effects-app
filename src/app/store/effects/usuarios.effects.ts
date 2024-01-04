import { Injectable } from "@angular/core";
import { Actions, createEffect, mergeEffects, ofType } from "@ngrx/effects";
import * as usuariosActions from '../actions/usuarios.actions';
import { mergeMap, of, tap } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { UsuarioService } from "src/app/services/usuario.service";


@Injectable()
export class UsuariosEffects {

    constructor(
        private actions$: Actions,
        private usuarioService: UsuarioService
     ) { }

     cargarUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuariosActions.cargarUsuarios ),
            mergeMap(
                () => this.usuarioService.getUser()
                    .pipe(
                        map( users => usuariosActions.cargarUsuariosSuccess({ usuarios: users }) ),
                        catchError( err => of(usuariosActions.cargarUsuariosError({ payload: err })) )
                    )
            )
        )
     )

}