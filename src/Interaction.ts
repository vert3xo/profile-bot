export interface CommandInteraction {
  type: 2;
  id: string;
  token: string;
  data: string;
  guild_id?: string;
  member?: {
    user: {
      id: string;
    };
  };
  user?: {
    id: string;
  };
}

export type InteractionDataComponent = {
  custom_id: 3;
  component_type: number;
};

export interface ComponentInteraction {
  type: 3;
  id: string;
  token: string;
  data: InteractionDataComponent;
  guild_id?: number;
  member?: {
    user: {
      id: string;
    };
  };
  user?: {
    id: string;
  };
}
