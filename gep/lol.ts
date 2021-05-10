/*
type LolInfoUpdates2Event = overwolf.gep.Lol.LolInfoUpdates2Event;
type LolMatchInfo = overwolf.gep.Lol.LolMatchInfo;

overwolf.games.events.onInfoUpdates2.addListener(
  (event: LolInfoUpdates2Event) => {
    if (event.feature === 'match_info') {
      const info = event.info as LolMatchInfo;

      if (info.game_mode === overwolf.gep.Lol.LolGameModes.SpikeRush) {
        // do something special if we're palying spike rush
      }
    }
  }
)
*/

/*
type LolGameEvent2Event = overwolf.gep.Lol.LolGameEvent2Event;
type LolGameEvents = overwolf.gep.Lol.LolGameEvents;

overwolf.games.events.onNewEvent2.addListener(
  (ev: LolGameEvent2Event) => {
    if (ev.name === 'kill') {
      const castData = (ev.data as LolGameEvents["kill"]);

      // do something with castData
    }
  }
);
*/

declare namespace overwolf.gep.Lol {
    // --------------------------------------------------------------------------
    enum LolAgents {
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
  
    enum LolAgentsFullNames {
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
  
    enum LolRoundPhases {
      Shopping = 'shopping',
      Combat = 'combat',
      End = 'end',
      GameEnd = 'game_end',
    }
  
    enum LolScenes {
      MainMenu = 'MainMenu',
      Haven = 'Triad',
      Bind = 'Duality',
      Split = 'Bonsai',
      Ascent = 'Ascent',
      Range = 'Range',
      CharacterSelection = 'CharacterSelectPersistentLevel',
    }
  
    enum LolStates {
      WaitingToStart = 'WaitingToStart',
      LeavingMap = 'LeavingMap',
      Aborted = 'Aborted',
      InProgress = 'InProgress',
      Init = 'Init',
    }
  
    enum LolGameModes {
      Standard = 'bomb',
      Deathmatch = 'deathmatch',
      SpikeRush = 'quick_bomb',
      Range = 'range',
    }
  
    enum LolTeams {
      Attack = 'attack',
      Defense = 'defense'
    }
  
    enum LolMatchOutcomes {
      Victory = 'victory',
      Defeat = 'defeat',
      Draw = 'draw',
    }
  
    // --------------------------------------------------------------------------
    type LolRosterMember = {
      name?: string;
      player_id?: string;
      character?: LolAgents;
      rank?: number;
      locked?: boolean;
      local?: boolean;
      teammate?: boolean;
    };
  
    // --------------------------------------------------------------------------
    interface LolFeature extends overwolf.games.events.InfoUpdate2 { }
  
    // --------------------------------------------------------------------------
    interface LolLive_client_data extends LolFeature {
      active_player?: string;
      all_players?: string;
      events?: string;
      game_data?: string;
      port?: number;
    }
  
    // --------------------------------------------------------------------------
    interface LolMatchInfo extends LolFeature {
      round_number?: number;
      score?: {
        won?: number;
        lost?: number;
      };
      round_phase?: LolRoundPhases,
      team?: LolTeams;
      match_outcome?: LolMatchOutcomes;
      round_report?: {
        damage?: number;
        hit?: number;
        headshot?: number;
        final_headshot?: number;
      };
      game_mode?: {
        mode?: LolGameModes;
        custom?: boolean;
        ranked?: number;
      };
  
      roster_0?: LolRosterMember;
      roster_1?: LolRosterMember;
      roster_2?: LolRosterMember;
      roster_3?: LolRosterMember;
      roster_4?: LolRosterMember;
      roster_5?: LolRosterMember;
      roster_6?: LolRosterMember;
      roster_7?: LolRosterMember;
      roster_8?: LolRosterMember;
      roster_9?: LolRosterMember;
    }
  
    // --------------------------------------------------------------------------
    interface LolGameInfo extends LolFeature {
      scene?: LolScenes;
      state?: LolStates;
    }
  
    // --------------------------------------------------------------------------
    interface LolMatchState extends LolFeature {
      matchStarted?: string;
      matchId?: string;
      queueId?: string;
    }
  
    // --------------------------------------------------------------------------
    type LolInfoUpdates = {
      game_Info?: LolGameInfo;
      match_info?: LolMatchInfo;
      game_info?: LolGameInfo;
      kill?: LolKill;
      death?: LolDeath;
    };
  
    /**
     * All available game events. When a new event is triggered, it's one of these
     * keys.
     */
    interface LolGameEvents extends overwolf.games.events.GameEventDictionary2 {
      kill?: number;
      death?: number;
      assist?: number;
      match_start?: null;
      match_end?: null;
      respawn?: null;
      ability?: number;
      usedAbility?: number;
      match_clock?: string;
      
    }
  
    /**
     * The feature names available in Lol's GEP
     */
    type LolFeatures = keyof LolInfoUpdates;
  
    /**
     * Intended to be used with overwolf.games.events.onInfoUpdates2.addListener
     */
    type LolInfoUpdates2Event =
      overwolf.games.events.InfoUpdates2Event<LolFeatures, LolFeature>;
  
    /**
     * Intended to be used with overwolf.games.events.onNewEvent2.addListener
     */
    type LolGameEvent2Event =
      overwolf.games.events.GameEvent2<LolGameEvents>;
  }
  