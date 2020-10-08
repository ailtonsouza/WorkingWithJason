import { promises as fs } from "fs";

async function readStates() {
  const estados = await JSON.parse(
    await fs.readFile("./cidades-estados-brasil-json/Estados.json", "UTF-8")
  );
  return estados;
}

async function readCities() {
  const cidades = await JSON.parse(
    await fs.readFile("./cidades-estados-brasil-json/Cidades.json", "UTF-8")
  );
  return cidades;
}

const cidades = await readCities();
const estados = await readStates();

async function MapCitiesByState(e) {
  const array = cidades.filter((c) => {
    return c.Estado === e.ID;
  });

  await fs.writeFile(
    `./CidadesPorEstado/${e.Sigla}.json`,
    JSON.stringify(array)
  );
}

async function PrintCitiesByState() {
  estados.map((e) => {
    MapCitiesByState(e);
  });
}

await PrintCitiesByState();

async function fromDir(filter) {
  var files = await fs.readdir("./CidadesPorEstado");
  for (var i = 0; i < files.length; i++) {
    if (files[i].includes(filter)) {
      const cidades = JSON.parse(
        await fs.readFile(`./CidadesPorEstado/${files[i]}`, "UTF-8")
      ).length;
      console.log(cidades);
      break;
    }
  }
}


async function fromDir2() {
  var files = await fs.readdir("./CidadesPorEstado");
  var cidades = [];
  for (var i = 0; i < files.length; i++) {
    cidades.push({ 'UF': files[i].slice(0,2) , 'Total': +JSON.parse(await fs.readFile(`./CidadesPorEstado/${files[i]}`, "UTF-8")).length});
  }
  const CidadesOrdenadasD = cidades.sort((a,b) => {
    return b.Total - a.Total || a.UF.localeCompare(b.UF);
  })
  console.log('Maior para o Menor')
  for (var i = 0; i < 5; i++) {
    console.log(CidadesOrdenadasD[i]);
  }
  const CidadesOrdenadasA = cidades.sort((a,b) => {
    return a.Total - b.Total || b.UF.localeCompare(a.UF);
  })
  console.log('Menor para o Maior')
  for (var i = 0; i < 5; i++) {
    console.log(CidadesOrdenadasA[i]);
  }

}

fromDir2();

async function fromDir3() {
  var files = await fs.readdir("./CidadesPorEstado");
  var cidades = [];
  for (var i = 0; i < files.length; i++) {
    cidades.push({
      UF: files[i].slice(0, 2),
      Cidades: JSON.parse(
        await fs.readFile(`./CidadesPorEstado/${files[i]}`, "UTF-8")
      ),
    });
  }

  const max = cidades.map((x) => {
    return {
      UF: x.UF,
      Nome: x.Cidades.map((x) => x.Nome).reduce((a, b) => {
        return a.length < b.length
          ? b
          : a.length !== b.length
          ? a
          : a < b
          ? a
          : b;
      }),
    };
  });
  console.log("array com a cidade de maior nome de cada estado");
  console.log(max);

  const min = cidades.map((x) => {
    return {
      UF: x.UF,
      Nome: x.Cidades.map((x) => x.Nome).reduce((a, b) => {
        return a.length > b.length
          ? b
          : a.length !== b.length
          ? a
          : a < b
          ? a
          : b;
      }),
    };
  });
  console.log("array com a cidade de menor nome de cada estado");
  console.log(min);
}

fromDir3();

async function fromDir4() {
  var files = await fs.readdir("./CidadesPorEstado");
  var cidades = [];
  for (var i = 0; i < files.length; i++) {
    cidades.push({
      UF: files[i].slice(0, 2),
      Cidades: JSON.parse(
        await fs.readFile(`./CidadesPorEstado/${files[i]}`, "UTF-8")
      ),
    });
  }

  const max = cidades
    .map((x) => {
      return {
        UF: x.UF,
        Nome: x.Cidades.map((x) => x.Nome).reduce((a, b) => {
          return a.length > b.length ? a : b;
        }),
      };
    })
    .reduce((a, b) => {
      return a.Nome.length < b.Nome.length
        ? b
        : a.Nome.length !== b.Nome.length
        ? a
        : a.Nome < b.Nome
        ? a
        : b;
    });
  console.log("\n cidade de maior nome entre todos os estados");
  console.log(max);

  const min = cidades
    .map((x) => {
      return {
        UF: x.UF,
        Nome: x.Cidades.map((x) => x.Nome).reduce((a, b) => {
          return a.length > b.length ? b : a;
        }),
      };
    })
    .reduce((a, b) => {
      return a.Nome.length > b.Nome.length
        ? b
        : a.Nome.length !== b.Nome.length
        ? a
        : a.Nome < b.Nome
        ? a
        : b;
    });
  console.log("\n cidade de menor nome entre todos os estados");
  console.log(min);
}

fromDir4();


