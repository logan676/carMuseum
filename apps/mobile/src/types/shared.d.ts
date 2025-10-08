declare module '@autoverse/shared' {
  export type {
    Brand,
    CarModel,
    Dealership,
    GarageVehicle,
    NewsArticle,
    NewsCategory,
    QuickLink,
    RestorationProject,
    TimelineEntry,
  } from '../../../../packages/shared/src/types';
}

declare module '@autoverse/shared/*' {
  export * from '../../../../packages/shared/src/types';
}
