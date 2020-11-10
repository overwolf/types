/*
type ValorantInfoUpdates2Event = overwolf.gep.Valorant.ValorantInfoUpdates2Event;
type ValorantMatchInfo = overwolf.gep.Valorant.ValorantMatchInfo;

overwolf.games.events.onInfoUpdates2.addListener(
  (event: ValorantInfoUpdates2Event) => {
    if (event.feature === 'match_info') {
      const info = event.info as ValorantMatchInfo;

      if (info.game_mode === overwolf.gep.Valorant.ValorantGameModes.SpikeRush) {
        // do something special if we're palying spike rush
      }
    }
  }
)
*/

/*
type ValorantGameEvent2Event = overwolf.gep.Valorant.ValorantGameEvent2Event;
type ValorantGameEvents = overwolf.gep.Valorant.ValorantGameEvents;

overwolf.games.events.onNewEvent2.addListener(
  (ev: ValorantGameEvent2Event) => {
    if (ev.name === 'kill') {
      const castData = (ev.data as ValorantGameEvents["kill"]);

      // do something with castData
    }
  }
);
*/

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
    Defeat = 'defeat',
    Draw = 'draw',
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
  };

  // --------------------------------------------------------------------------
  interface ValorantFeature extends overwolf.games.events.InfoUpdate2 { }

  // --------------------------------------------------------------------------
  interface ValorantMe extends ValorantFeature {
    player_name?: string;
    player_id?: string;
    region?: string;
    agent?: ValorantAgentsFullNames;
  }

  // --------------------------------------------------------------------------
  interface ValorantMatchInfo extends ValorantFeature {
    round_number?: number;
    score?: {
      won?: number;
      lost?: number;
    };
    round_phase?: ValorantRoundPhases,
    team?: ValorantTeams;
    match_outcome?: ValorantMatchOutcomes;
    round_report?: {
      damage?: number;
      hit?: number;
      headshot?: number;
      final_headshot?: number;
    };
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
  interface ValorantGameInfo extends ValorantFeature {
    scene?: ValorantScenes;
    state?: ValorantStates;
  }

  // --------------------------------------------------------------------------
  interface ValorantKill extends ValorantFeature {
    kills?: number;
    assists?: number;
    headshots?: number;
  }

  // --------------------------------------------------------------------------
  interface ValorantDeath extends ValorantFeature {
    deaths?: number;
  }

  // --------------------------------------------------------------------------
  type ValorantInfoUpdates = {
    me?: ValorantMe;
    match_info?: ValorantMatchInfo;
    game_info?: ValorantGameInfo;
    kill?: ValorantKill;
    death?: ValorantDeath;
  };

  /**
   * All available game events. When a new event is triggered, it's one of these
   * keys.
   */
  interface ValorantGameEvents extends overwolf.games.events.GameEventDictionary2 {
    kill?: number;
    death?: number;
    assist?: number;
    match_start?: null;
    match_end?: null;
  }

  /**
   * The feature names available in Valorant's GEP
   */
  type ValorantFeatures = keyof ValorantInfoUpdates;

  /**
   * Intended to be used with overwolf.games.events.onInfoUpdates2.addListener
   */
  type ValorantInfoUpdates2Event =
    overwolf.games.events.InfoUpdates2Event<ValorantFeatures, ValorantFeature>;

  /**
   * Intended to be used with overwolf.games.events.onNewEvent2.addListener
   */
  type ValorantGameEvent2Event =
    overwolf.games.events.GameEvent2<ValorantGameEvents>;
}
