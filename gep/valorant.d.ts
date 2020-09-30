declare namespace overwolf.gep.Valorant {
  // --------------------------------------------------------------------------
  enum ValorantAgents {
    Raze = 'Clay',
    Viper = 'Pandemic',
    Omen = 'Wraith',
    Sova = 'Hunter',
    Sage = 'Thorne',
    Phoenix = 'Phoenix',
    Jett = 'Wushu',
    Cypher = 'Gumshoe',
    Brimstone = 'Sarge',
    Breach = 'Breach',
    Reyna = 'Vampire',
    Killjoy = 'Killjoy',
  }

  enum ValorantAgentsFullNames {
    Raze = 'Clay_PC_C',
    Viper = 'Pandemic_PC_C',
    Omen = 'Wraith_PC_C',
    Sova = 'Hunter_PC_C',
    Sage = 'Thorne_PC_C',
    Phoenix = 'Phoenix_PC_C',
    Jett = 'Wushu_PC_C',
    Cypher = 'Gumshoe_PC_C',
    Brimstone = 'Sarge_PC_C',
    Breach = 'Breach_PC_C',
    Reyna = 'Vampire_PC_C',
    Killjoy = 'Killjoy_PC_C',
  }

  enum ValorantRoundPhases {
    Shopping = 'shopping',
    Combat = 'combat',
    End = 'end',
    GameEnd = 'game_end',
  }

  enum ValorantScenes {
    MainMenu = 'MainMenu',
    Haven = 'Triad',
    Bind = 'Duality',
    Split = 'Bonsai',
    Ascent = 'Ascent',
    Range = 'Range',
    CharacterSelection = 'CharacterSelectPersistentLevel',
  }

  enum ValorantStates {
    WaitingToStart = 'WaitingToStart',
    LeavingMap = 'LeavingMap',
    Aborted = 'Aborted',
    InProgress = 'InProgress',
    Init = 'Init',
  }

  enum ValorantGameModes {
    Standard = 'bomb',
    Deathmatch = 'deathmatch',
    SpikeRush = 'quick_bomb',
    Range = 'range',
  }

  enum ValorantTeams {
    Attack = 'attack',
    Defense = 'defense'
  }

  enum ValorantMatchOutcomes {
    Victory = 'victory',
    Defeat = 'defeat'
  }

  // --------------------------------------------------------------------------
  type ValorantRosterMember = {
    name?: string;
    player_id?: string;
    character?: ValorantAgents;
    rank?: number;
    locked?: boolean;
    local?: boolean;
    teammate?: boolean;
  }

  // --------------------------------------------------------------------------
  interface IValorantFeature { }

  // --------------------------------------------------------------------------
  interface ValorantMe extends IValorantFeature {
    player_name?: string
    player_id?: string
    region?: string
    agent?: ValorantAgentsFullNames
  }

  // --------------------------------------------------------------------------
  interface ValorantMatchInfo extends IValorantFeature {
    round_number?: number;
    score?: {
      won?: number;
      lost?: number;
    }
    round_phase?: ValorantRoundPhases,
    team?: ValorantTeams;
    match_outcome?: ValorantMatchOutcomes;
    round_report?: {
      damage?: number;
      hit?: number;
      headshot?: number;
      final_headshot?: number;
    }
    game_mode?: {
      mode?: ValorantGameModes;
      custom?: boolean;
      ranked?: number;
    };

    roster_0?: ValorantRosterMember;
    roster_1?: ValorantRosterMember;
    roster_2?: ValorantRosterMember;
    roster_3?: ValorantRosterMember;
    roster_4?: ValorantRosterMember;
    roster_5?: ValorantRosterMember;
    roster_6?: ValorantRosterMember;
    roster_7?: ValorantRosterMember;
    roster_8?: ValorantRosterMember;
    roster_9?: ValorantRosterMember;
  }

  // --------------------------------------------------------------------------
  interface ValorantGameInfo extends IValorantFeature {
    scene?: ValorantScenes;
    state?: ValorantStates;
  }

  // --------------------------------------------------------------------------
  interface ValorantKill extends IValorantFeature {
    kills?: number;
    assists?: number;
    headshots?: number;
  }

  // --------------------------------------------------------------------------
  interface ValorantDeath extends IValorantFeature {
    deaths?: number;
  }

  // --------------------------------------------------------------------------
  type ValorantInfoUpdates = {
    me?: ValorantMe
    match_info?: ValorantMatchInfo
    game_info?: ValorantGameInfo
    kill?: ValorantKill
    death?: ValorantDeath
  }

  // --------------------------------------------------------------------------
  type ValorantFeatures = keyof ValorantInfoUpdates;
}