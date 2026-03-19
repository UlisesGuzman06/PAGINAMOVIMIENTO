// Datos estáticos de Oasis – en el futuro se reemplazarán por llamadas a la API/BD
// El Admin Panel gestionará estos datos

export interface Retiro {
  slug: string;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  citaBiblica: string;
  citaReferencia: string;
  fechas: string;
  lugar: string;
  ciudad: string;
  cupos: number;
  estado: "abierto" | "proximo" | "cerrado" | "memoria";
}

export interface EdicionOasis {
  año: number;
  slug: string;
  titulo: string;
  descripcion: string;
  estado: "abierto" | "proximo" | "cerrado" | "memoria";
  retiros: Retiro[];
}

export const edicionesOasis: EdicionOasis[] = [
  {
    año: 2026,
    slug: "2026",
    titulo: "Oasis 2026",
    descripcion:
      "Una nueva edición llena de encuentros de renovación profunda para la juventud que busca un camino de fe y esperanza.",
    estado: "proximo",
    retiros: [
      {
        slug: "verano",
        titulo: "Oasis de Verano: El Encuentro",
        subtitulo: "Reconecta con tu fe en medio de la naturaleza",
        descripcion:
          "Este retiro es mucho más que un campamento de verano; es una invitación personal a detenerse, respirar y reconectar con lo esencial. Durante cuatro días, nos sumergimos en un ambiente de hermandad, oración y reflexión profunda. Exploraremos juntos el significado del discipulado en el mundo moderno, participando en talleres prácticos, momentos de adoración comunitaria y espacios de silencio para la escucha interior. Un oasis en medio de la rutina diaria.",
        citaBiblica:
          "Yo soy el camino, la verdad y la vida; nadie viene al Padre, sino por mí.",
        citaReferencia: "Juan 14:6",
        fechas: "15 - 18 de Enero, 2026",
        lugar: 'Casa de Retiros "San José"',
        ciudad: "Villa Allende, Córdoba",
        cupos: 60,
        estado: "proximo",
      },
      {
        slug: "otono",
        titulo: "Oasis de Otoño: Silencio Interior",
        subtitulo: "Descubre la voz de Dios en el silencio",
        descripcion:
          "Descubre la voz de Dios en el silencio y la oración contemplativa rodeado de colores otoñales. Un tiempo para soltar el ruido del mundo y escuchar lo que Dios tiene para decirte en lo más profundo de tu ser. Un retiro de interioridad, meditación y adoración.",
        citaBiblica:
          "Quédense quietos y sepan que yo soy Dios.",
        citaReferencia: "Salmo 46:10",
        fechas: "10 - 13 de Abril, 2026",
        lugar: 'Casa de Retiros "La Montaña"',
        ciudad: "Mina Clavero, Córdoba",
        cupos: 50,
        estado: "proximo",
      },
      {
        slug: "invierno",
        titulo: "Oasis de Invierno: Calor de Hogar",
        subtitulo: "Fraternidad en los tiempos más fríos",
        descripcion:
          "Un retiro dedicado a la comunidad y el calor de la fraternidad en los tiempos más fríos del año. Juntos, descubrimos que somos el cuerpo de Cristo, llamados a sostenernos mutuamente. Talleres de comunidad, liturgia vivida y momentos de servicio compartido.",
        citaBiblica:
          "Donde dos o tres se reúnen en mi nombre, allí estoy yo en medio de ellos.",
        citaReferencia: "Mateo 18:20",
        fechas: "3 - 6 de Julio, 2026",
        lugar: 'Centro Espiritual "Cristo Vive"',
        ciudad: "Alta Gracia, Córdoba",
        cupos: 70,
        estado: "proximo",
      },
      {
        slug: "primavera",
        titulo: "Oasis de Primavera: Nueva Vida",
        subtitulo: "Celebramos la resurrección y el renacer",
        descripcion:
          "Celebramos la resurrección y el renacer de la esperanza en nuestra vida espiritual cotidiana. La primavera nos habla de un Dios que hace nuevas todas las cosas. Este retiro es un espacio para dejar atrás lo viejo y abrazar la vida nueva que Cristo nos ofrece.",
        citaBiblica: "Si alguno está en Cristo, es una nueva creación.",
        citaReferencia: "2 Corintios 5:17",
        fechas: "25 - 28 de Septiembre, 2026",
        lugar: 'Casa de Oración "Emaús"',
        ciudad: "Unquillo, Córdoba",
        cupos: 55,
        estado: "proximo",
      },
    ],
  },
  {
    año: 2025,
    slug: "2025",
    titulo: "Oasis 2025",
    descripcion:
      "Inscripciones abiertas para vivir un encuentro único de renovación espiritual.",
    estado: "abierto",
    retiros: [
      {
        slug: "verano",
        titulo: "Oasis de Verano 2025: Maranatha",
        subtitulo: "Ven Señor Jesús",
        descripcion:
          "Un retiro de adoración y encuentro profundo con Jesús. Bajo el lema Maranatha – Ven Señor Jesús, nos disponemos a recibir Su presencia de manera renovada. Momentos de alabanza, reconciliación y misión.",
        citaBiblica: "Maranatha. Ven, Señor Jesús.",
        citaReferencia: "Apocalipsis 22:20",
        fechas: "17 - 20 de Enero, 2025",
        lugar: 'Casa de Retiros "San Francisco"',
        ciudad: "Jesús María, Córdoba",
        cupos: 65,
        estado: "abierto",
      },
      {
        slug: "otono",
        titulo: "Oasis de Otoño 2025: En el Desierto",
        subtitulo: "Donde Dios habla al corazón",
        descripcion:
          "Como el profeta Elías en el desierto, nos disponemos a escuchar la voz suave y delicada de Dios. Retiro de interioridad, ayuno y reconocimiento de la presencia de Dios en lo cotidiano.",
        citaBiblica: "Después del fuego, una voz apacible y delicada.",
        citaReferencia: "1 Reyes 19:12",
        fechas: "11 - 14 de Abril, 2025",
        lugar: 'Casa de Retiros "El Cenáculo"',
        ciudad: "Cosquín, Córdoba",
        cupos: 48,
        estado: "cerrado",
      },
      {
        slug: "invierno",
        titulo: "Oasis de Invierno 2025: Unidos",
        subtitulo: "La fuerza de la comunidad",
        descripcion:
          "Unidos en la fe, somos más fuertes. Este retiro nos llama a reconocer el don de la comunidad cristiana y a fortalecer los lazos de la fraternidad. Dinámica de grupos, misa comunitaria y compromiso misionero.",
        citaBiblica:
          "Cuánto bien, cuánta alegría, vivir los hermanos juntos.",
        citaReferencia: "Salmo 133:1",
        fechas: "4 - 7 de Julio, 2025",
        lugar: 'Centro Juvenil "San Juan Bosco"',
        ciudad: "Villa Carlos Paz, Córdoba",
        cupos: 80,
        estado: "cerrado",
      },
      {
        slug: "primavera",
        titulo: "Oasis de Primavera 2025: Kairós",
        subtitulo: "El tiempo de Dios",
        descripcion:
          "Kairós: el tiempo de gracia, el momento de Dios. Este retiro nos invita a reconocer los momentos en que Dios actúa en nuestra historia personal y comunitaria. Testimonios, adoración y discernimiento vocacional.",
        citaBiblica: "Este es el momento favorable; este es el día de salvación.",
        citaReferencia: "2 Corintios 6:2",
        fechas: "26 - 29 de Septiembre, 2025",
        lugar: 'Casa de Oración "Nazaret"',
        ciudad: "Río Ceballos, Córdoba",
        cupos: 60,
        estado: "abierto",
      },
    ],
  },
  {
    año: 2024,
    slug: "2024",
    titulo: "Oasis 2024",
    descripcion: "Memoria histórica de un año lleno de encuentros y gracias.",
    estado: "memoria",
    retiros: [
      {
        slug: "verano",
        titulo: "Oasis de Verano 2024: El Encuentro",
        subtitulo: "Una experiencia profunda para reconectar con tu fe",
        descripcion:
          "Este retiro fue mucho más que un campamento de verano; fue una invitación personal a detenerse, respirar y reconectar con lo esencial. Durante cuatro días, nos sumergimos en un ambiente de hermandad, oración y reflexión profunda.",
        citaBiblica:
          "Yo soy el camino, la verdad y la vida; nadie viene al Padre, sino por mí.",
        citaReferencia: "Juan 14:6",
        fechas: "15 - 18 de Julio, 2024",
        lugar: 'Casa de Retiros "San José"',
        ciudad: "Villa de Leyva, Boyacá",
        cupos: 60,
        estado: "memoria",
      },
      {
        slug: "otono",
        titulo: "Oasis de Otoño 2024: Raíces",
        subtitulo: "Volviendo a los fundamentos",
        descripcion:
          "Un retiro que nos llevaría de regreso a los fundamentos de nuestra fe. Volvimos a las raíces del Evangelio y a la esencia del discipulado cristiano.",
        citaBiblica: "Permanezcan en mí y yo permaneceré en ustedes.",
        citaReferencia: "Juan 15:4",
        fechas: "12 - 15 de Abril, 2024",
        lugar: 'Casa de Retiros "Santa Clara"',
        ciudad: "La Falda, Córdoba",
        cupos: 55,
        estado: "memoria",
      },
    ],
  },
];

export const añosHistoricos = [2023, 2022, 2021, 2020, 2019];

export function getEdicion(slug: string): EdicionOasis | undefined {
  return edicionesOasis.find((e) => e.slug === slug);
}

export function getRetiro(
  añoSlug: string,
  retiroSlug: string
): Retiro | undefined {
  const edicion = getEdicion(añoSlug);
  return edicion?.retiros.find((r) => r.slug === retiroSlug);
}
