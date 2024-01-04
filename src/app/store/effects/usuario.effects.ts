import { Injectable } from "@angular/core";
import { Actions, createEffect, mergeEffects, ofType } from "@ngrx/effects";
import * as usuariosActions from '../actions';
import { mergeMap, of, tap } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { UsuarioService } from "src/app/services/usuario.service";


@Injectable()
export class UsuarioEffects {

    constructor(
        private actions$: Actions,
        private usuarioService: UsuarioService
     ) { }

     cargarUsuario$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuariosActions.cargarUsuario ),
            mergeMap(
                ( action ) => this.usuarioService.getUserById( action.id )
                    .pipe(
                        map( user => usuariosActions.cargarUsuarioSuccess({ usuario: user }) ),
                        catchError( err => of(usuariosActions.cargarUsuarioError({ payload: err })) )
                    )
            )
        )
     )

}