import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [
  ]
})
export class ListaComponent {

  usuarios: Usuario[] = [];

  constructor( public usuarioService: UsuarioService ) { }

  ngOnInit(): void {
    
    this.usuarioService.getUser()
      .subscribe( data => {
        console.log('hello', data);
        this.usuarios = data;
      });
  }

}
