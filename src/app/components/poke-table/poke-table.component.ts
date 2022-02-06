import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.scss']
})
export class PokeTableComponent implements OnInit {

  //Columnas PokemonTable 
  displayedColumns: string[] = ['position', 'name', 'image'];
  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);
  //Paginacion
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator; // paginator(!)como un sufijo al nombre de la variable.



  pokemons = [];


  
  constructor(private ApiService: ApiService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  //Filter Generico
  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim(); // Elimina espacios
  //   filterValue = filterValue.toLowerCase(); // Datasource predeterminado coicidencias lowercase 
  //   this.dataSource.filter = filterValue;
  // }


 //Filtro V2
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

  getPokemons(){ 
    let infoPokemon;

    for(let i =21; i<=30; i++){ 
      this.ApiService.getPokemon(i).subscribe(  
        res => {
          infoPokemon = {
            position:i,
            name:res.name,
            image: res.sprites.front_default //sprites.front_default = api ItemSprites 
           
          };
          this.data.push(infoPokemon) //Se almacen los datos de dataP a el array data
          this.dataSource = new MatTableDataSource<any>(this.data) //Actualizar dataSource que se inicializa vacio
          this.dataSource.paginator = this.paginator;
          console.log(res)
        },
        err =>{
          console.log(err)
        }
      );
    } 

      
    
  }


  


getRow(row:number){
  console.log(row); 

}



}