enum BlockShapes {
    HAT = 'hat',
    BOOLEAN = 'boolean',
    REPORTER = 'reporter',
    C = 'c',
    CAP = 'cap',
    STACK = 'stack',
}

enum BlockOpcodes {
    CONTROL_FOREVER = 'control_forever',
    CONTROL_REPEAT = 'control_repeat',
    CONTROL_IF = 'control_if',
    CONTROL_IF_ELSE = 'control_if_else',
    CONTROL_STOP = 'control_stop',
    CONTROL_WAIT = 'control_wait',
    CONTROL_WAIT_UNTIL = 'control_wait_until',
    CONTROL_REPEAT_UNTIL = 'control_repeat_until',
    CONTROL_WHILE = 'control_while',
    CONTROL_FOR_EACH = 'control_for_each',
    CONTROL_START_AS_CLONE = 'control_start_as_clone',
    CONTROL_CREATE_CLONE_OF_MENU = 'control_create_clone_of_menu',
    CONTROL_CREATE_CLONE_OF = 'control_create_clone_of',
    CONTROL_DELETE_THIS_CLONE = 'control_delete_this_clone',
    CONTROL_GET_COUNTER = 'control_get_counter',
    CONTROL_INCR_COUNTER = 'control_incr_counter',
    CONTROL_CLEAR_COUNTER = 'control_clear_counter',
    CONTROL_ALL_AT_ONCE = 'control_all_at_once',
    DATA_VARIABLE = 'data_variable',
    DATA_SETVARIABLETO = 'data_setvariableto',
    DATA_CHANGEVARIABLEBY = 'data_changevariableby',
    DATA_SHOWVARIABLE = 'data_showvariable',
    DATA_HIDEVARIABLE = 'data_hidevariable',
    DATA_LISTCONTENTS = 'data_listcontents',
    DATA_LISTINDEXALL = 'data_listindexall',
    DATA_LISTINDEXRANDOM = 'data_listindexrandom',
    DATA_ADDTOLIST = 'data_addtolist',
    DATA_DELETEOFLIST = 'data_deleteoflist',
    DATA_DELETEALLOFLIST = 'data_deletealloflist',
    DATA_INSERTATLIST = 'data_insertatalist',
    DATA_REPLACEITEMOFLIST = 'data_replaceitemoflist',
    DATA_ITEMOFLIST = 'data_itemoflist',
    DATA_ITEMNUMOFLIST = 'data_itemnumoflist',
    DATA_LENGTHOFLIST = 'data_lengthoflist',
    DATA_LISTCONTAINSITEM = 'data_listcontainsitem',
    DATA_SHOWLIST = 'data_showlist',
    DATA_HIDELIST = 'data_hideslist',
    EVENT_WHENTOUCHINGOBJECT = 'event_whentouchingobject',
    EVENT_TOUCHINGOBJECTMENU = 'event_touchingobjectmenu',
    EVENT_WHENFLAGCLICKED = 'event_whenflagclicked',
    EVENT_WHENTHISSPRITECLICKED = 'event_whenthisspriteclicked',
    EVENT_WHENSTAGECLICKED = 'event_whenstageclicked',
    EVENT_WHENBROADCASTRECEIVED = 'event_whenbroadcastreceived',
    EVENT_WHENBACKDROPSWITCHESTO = 'event_whenbackdropswitchesto',
    EVENT_WHENGREATERTHAN = 'event_whengreaterthan',
    EVENT_BROADCAST_MENU = 'event_broadcast_menu',
    EVENT_BROADCAST = 'event_broadcast',
    EVENT_BROADCASTANDWAIT = 'event_broadcastandwait',
    EVENT_WHENKEYPRESSED = 'event_whenkeypressed',
    LOOKS_SAYFORSECS = 'looks_sayforsecs',
    LOOKS_SAY = 'looks_say',
    LOOKS_THINKFORSECS = 'looks_thinkforsecs',
    LOOKS_THINK = 'looks_think',
    LOOKS_SHOW = 'looks_show',
    LOOKS_HIDE = 'looks_hide',
    LOOKS_HIDEALLSPRITES = 'looks_hideallsprites',
    LOOKS_CHANGEEFFECTBY = 'looks_changeeffectby',
    LOOKS_SETEFFECTTO = 'looks_seteffectto',
    LOOKS_CHANGESIZEBY = 'looks_changesizeby',
    LOOKS_SETSIZETO = 'looks_setsizeto',
    LOOKS_CHANGESTRETCHBY = 'looks_changestretchby',
    LOOKS_SETSTRETCHTO = 'looks_setstretchto',
    LOOKS_COSTUME = 'looks_costume',
    LOOKS_SWITCHCOSTUMETO = 'looks_switchcostumeto',
    LOOKS_NEXTCOSTUME = 'looks_nextcostume',
    LOOKS_SWITCHBACKDROPTO = 'looks_switchbackdropto',
    LOOKS_BACKDROPS = 'looks_backdrops',
    LOOKS_GOTOFRONTBACK = 'looks_gotofrontback',
    LOOKS_GOFORWARDBACKWARDLAYERS = 'looks_goforwardbackwardlayers',
    LOOKS_BACKDROPNUMBERNAME = 'looks_backdropnumbername',
    LOOKS_COSTUMENUMBERNAME = 'looks_costumenumbername',
    LOOKS_SWITCHBACKDROPTOANDWAIT = 'looks_switchbackdroptoandwait',
    LOOKS_NEXTBACKDROP = 'looks_nextbackdrop',
    MOTION_MOVESTEPS = 'motion_movesteps',
    MOTION_TURNRIGHT = 'motion_turnright',
    MOTION_TURNLEFT = 'motion_turnleft',
    MOTION_POINTINDIRECTION = 'motion_pointindirection',
    MOTION_POINTTOWARDS_MENU = 'motion_pointtowards_menu',
    MOTION_POINTOWARDS = 'motion_pointtowards',
    MOTION_GOTO_MENU = 'motion_goto_menu',
    MOTION_GOTOXY = 'motion_gotoxy',
    MOTION_GLIDESECTOXY = 'motion_glidesecstoxy',
    MOTION_GLIDETO_MENU = 'motion_glideto_menu',
    MOTION_GLIDETO = 'motion_glideto',
    MOTION_CHANGEXBY = 'motion_changexby',
    MOTION_SETX = 'motion_setx',
    MOTION_SETY = 'motion_sety',
    MOTION_IFONEDGEBOUNCE = 'motion_ifonedgebounce',
    MOTION_SETROTATIONSTYLE = 'motion_setrotationstyle',
    MOTION_XPOSITION = 'motion_xposition',
    MOTION_YPOSITION = 'motion_yposition',
    MOTION_DIRECTION = 'motion_direction',
    MOTION_SCROLL_RIGHT = 'motion_scroll_right',
    MOTION_SCROLL_LEFT = 'motion_scroll_left',
    MOTION_ALIGN_SCENE = 'motion_align_scene',
    MOTION_XSCROLL = 'motion_xscroll',
    MOTION_YSCROLL = 'motion_yscroll',
    OPERATOR_ADD = 'operator_add',
    OPERATOR_SUBTRACT = 'operator_subtract',
    OPERATOR_MULTIPLY = 'operator_multiply',
    OPERATOR_DIVIDE = 'operator_divide',
    OPERATOR_RANDOM = 'operator_random',
    OPERATOR_LT = 'operator_lt',
    OPERATOR_EQUALS = 'operator_equals',
    OPERATOR_GT = 'operator_gt',
    OPERATOR_AND = 'operator_and',
    OPERATOR_OR = 'operator_or',
    OPERATOR_NOT = 'operator_not',
    OPERATOR_JOIN = 'operator_join',
    OPERATOR_LETTER_OF = 'operator_letter_of',
    OPERATOR_LENGTH = 'operator_length',
    OPERATOR_CONTAINS = 'operator_contains',
    OPERATOR_MOD = 'operator_mod',
    OPERATOR_ROUND = 'operator_round',
    OPERATOR_MATHOP = 'operator_mathop',
}

export const BlockOpcodeToShape = {
    [BlockOpcodes.CONTROL_FOREVER]: BlockShapes.CAP,
    [BlockOpcodes.CONTROL_REPEAT]: BlockShapes.C,
    [BlockOpcodes.CONTROL_IF]: BlockShapes.C,
    [BlockOpcodes.CONTROL_IF_ELSE]: BlockShapes.C,
    [BlockOpcodes.CONTROL_STOP]: BlockShapes.CAP,
    [BlockOpcodes.CONTROL_WAIT]: BlockShapes.STACK,
    [BlockOpcodes.CONTROL_WAIT_UNTIL]: BlockShapes.C,
    [BlockOpcodes.CONTROL_REPEAT_UNTIL]: BlockShapes.C,
    [BlockOpcodes.CONTROL_WHILE]: BlockShapes.C,
    [BlockOpcodes.CONTROL_FOR_EACH]: BlockShapes.C,
    [BlockOpcodes.CONTROL_START_AS_CLONE]: BlockShapes.HAT,
    [BlockOpcodes.CONTROL_CREATE_CLONE_OF_MENU]: BlockShapes.STACK,
    [BlockOpcodes.CONTROL_CREATE_CLONE_OF]: BlockShapes.STACK,
    [BlockOpcodes.CONTROL_DELETE_THIS_CLONE]: BlockShapes.CAP,
    [BlockOpcodes.CONTROL_GET_COUNTER]: BlockShapes.STACK,
    [BlockOpcodes.CONTROL_INCR_COUNTER]: BlockShapes.C,
    [BlockOpcodes.CONTROL_CLEAR_COUNTER]: BlockShapes.C,
    [BlockOpcodes.CONTROL_ALL_AT_ONCE]: BlockShapes.C,
    [BlockOpcodes.DATA_VARIABLE]: BlockShapes.REPORTER,
    [BlockOpcodes.DATA_SETVARIABLETO]: BlockShapes.STACK,
    [BlockOpcodes.DATA_CHANGEVARIABLEBY]: BlockShapes.STACK,
    [BlockOpcodes.DATA_SHOWVARIABLE]: BlockShapes.STACK,
    [BlockOpcodes.DATA_HIDEVARIABLE]: BlockShapes.STACK,
    [BlockOpcodes.DATA_LISTCONTENTS]: BlockShapes.REPORTER,
    [BlockOpcodes.DATA_LISTINDEXALL]: BlockShapes.REPORTER,
    [BlockOpcodes.DATA_LISTINDEXRANDOM]: BlockShapes.REPORTER,
    [BlockOpcodes.DATA_ADDTOLIST]: BlockShapes.STACK,
    [BlockOpcodes.DATA_DELETEOFLIST]: BlockShapes.STACK,
    [BlockOpcodes.DATA_DELETEALLOFLIST]: BlockShapes.STACK,
    [BlockOpcodes.DATA_INSERTATLIST]: BlockShapes.STACK,
    [BlockOpcodes.DATA_REPLACEITEMOFLIST]: BlockShapes.STACK,
    [BlockOpcodes.DATA_ITEMOFLIST]: BlockShapes.REPORTER,
    [BlockOpcodes.DATA_ITEMNUMOFLIST]: BlockShapes.REPORTER,
    [BlockOpcodes.DATA_LENGTHOFLIST]: BlockShapes.REPORTER,
    [BlockOpcodes.DATA_LISTCONTAINSITEM]: BlockShapes.BOOLEAN,
    [BlockOpcodes.DATA_SHOWLIST]: BlockShapes.STACK,
    [BlockOpcodes.DATA_HIDELIST]: BlockShapes.STACK,
    [BlockOpcodes.EVENT_WHENTOUCHINGOBJECT]: BlockShapes.HAT,
    [BlockOpcodes.EVENT_TOUCHINGOBJECTMENU]: BlockShapes.REPORTER,
    [BlockOpcodes.EVENT_WHENFLAGCLICKED]: BlockShapes.HAT,
    [BlockOpcodes.EVENT_WHENTHISSPRITECLICKED]: BlockShapes.HAT,
    [BlockOpcodes.EVENT_WHENSTAGECLICKED]: BlockShapes.HAT,
    [BlockOpcodes.EVENT_WHENBROADCASTRECEIVED]: BlockShapes.HAT,
    [BlockOpcodes.EVENT_WHENBACKDROPSWITCHESTO]: BlockShapes.HAT,
    [BlockOpcodes.EVENT_WHENGREATERTHAN]: BlockShapes.HAT,
    [BlockOpcodes.EVENT_BROADCAST_MENU]: BlockShapes.REPORTER,
    [BlockOpcodes.EVENT_BROADCAST]: BlockShapes.STACK,
    [BlockOpcodes.EVENT_BROADCASTANDWAIT]: BlockShapes.STACK,
    [BlockOpcodes.EVENT_WHENKEYPRESSED]: BlockShapes.HAT,
    [BlockOpcodes.LOOKS_SAYFORSECS]: BlockShapes.STACK,
    [BlockOpcodes.LOOKS_SAY]: BlockShapes.STACK,
    [BlockOpcodes.LOOKS_THINKFORSECS]: BlockShapes.STACK,
    [BlockOpcodes.LOOKS_THINK]: BlockShapes.STACK,
    [BlockOpcodes.LOOKS_SHOW]: BlockShapes.STACK,
    [BlockOpcodes.LOOKS_HIDE]: BlockShapes.STACK,
    [BlockOpcodes.LOOKS_HIDEALLSPRITES]: BlockShapes.STACK,
    [BlockOpcodes.LOOKS_CHANGEEFFECTBY]: BlockShapes.STACK,
    [BlockOpcodes.LOOKS_SETEFFECTTO]: BlockShapes.STACK,
    [BlockOpcodes.LOOKS_CHANGESIZEBY]: BlockShapes.STACK,
    [BlockOpcodes.LOOKS_SETSIZETO]: BlockShapes.STACK,
    [BlockOpcodes.LOOKS_CHANGESTRETCHBY]: BlockShapes.STACK,
    [BlockOpcodes.LOOKS_SETSTRETCHTO]: BlockShapes.STACK,
    [BlockOpcodes.LOOKS_COSTUME]: BlockShapes.REPORTER,
    [BlockOpcodes.LOOKS_SWITCHCOSTUMETO]: BlockShapes.STACK,
    [BlockOpcodes.LOOKS_NEXTCOSTUME]: BlockShapes.STACK,
    [BlockOpcodes.LOOKS_SWITCHBACKDROPTO]: BlockShapes.STACK,
    [BlockOpcodes.LOOKS_BACKDROPS]: BlockShapes.REPORTER,
    [BlockOpcodes.LOOKS_GOTOFRONTBACK]: BlockShapes.REPORTER,
    [BlockOpcodes.LOOKS_GOFORWARDBACKWARDLAYERS]: BlockShapes.STACK,
    [BlockOpcodes.LOOKS_BACKDROPNUMBERNAME]: BlockShapes.REPORTER,
    [BlockOpcodes.LOOKS_COSTUMENUMBERNAME]: BlockShapes.REPORTER,
    [BlockOpcodes.LOOKS_SWITCHBACKDROPTOANDWAIT]: BlockShapes.STACK,
    [BlockOpcodes.LOOKS_NEXTBACKDROP]: BlockShapes.STACK,
    [BlockOpcodes.MOTION_MOVESTEPS]: BlockShapes.STACK,
    [BlockOpcodes.MOTION_TURNRIGHT]: BlockShapes.STACK,
    [BlockOpcodes.MOTION_TURNLEFT]: BlockShapes.STACK,
    [BlockOpcodes.MOTION_POINTINDIRECTION]: BlockShapes.STACK,
    [BlockOpcodes.MOTION_POINTTOWARDS_MENU]: BlockShapes.REPORTER,
    [BlockOpcodes.MOTION_POINTOWARDS]: BlockShapes.STACK,
    [BlockOpcodes.MOTION_GOTO_MENU]: BlockShapes.REPORTER,
    [BlockOpcodes.MOTION_GOTOXY]: BlockShapes.STACK,
    [BlockOpcodes.MOTION_GLIDESECTOXY]: BlockShapes.STACK,
    [BlockOpcodes.MOTION_GLIDETO_MENU]: BlockShapes.REPORTER,
    [BlockOpcodes.MOTION_GLIDETO]: BlockShapes.STACK,
    [BlockOpcodes.MOTION_CHANGEXBY]: BlockShapes.STACK,
    [BlockOpcodes.MOTION_SETX]: BlockShapes.STACK,
    [BlockOpcodes.MOTION_SETY]: BlockShapes.STACK,
    [BlockOpcodes.MOTION_IFONEDGEBOUNCE]: BlockShapes.STACK,
    [BlockOpcodes.MOTION_SETROTATIONSTYLE]: BlockShapes.STACK,
    [BlockOpcodes.MOTION_XPOSITION]: BlockShapes.REPORTER,
    [BlockOpcodes.MOTION_YPOSITION]: BlockShapes.REPORTER,
    [BlockOpcodes.MOTION_DIRECTION]: BlockShapes.REPORTER,
    [BlockOpcodes.MOTION_SCROLL_RIGHT]: BlockShapes.STACK,
    [BlockOpcodes.MOTION_SCROLL_LEFT]: BlockShapes.STACK,
    [BlockOpcodes.MOTION_ALIGN_SCENE]: BlockShapes.STACK,
    [BlockOpcodes.MOTION_XSCROLL]: BlockShapes.STACK,
    [BlockOpcodes.MOTION_YSCROLL]: BlockShapes.STACK,
    [BlockOpcodes.OPERATOR_ADD]: BlockShapes.REPORTER,
    [BlockOpcodes.OPERATOR_SUBTRACT]: BlockShapes.REPORTER,
    [BlockOpcodes.OPERATOR_MULTIPLY]: BlockShapes.REPORTER,
    [BlockOpcodes.OPERATOR_DIVIDE]: BlockShapes.REPORTER,
    [BlockOpcodes.OPERATOR_RANDOM]: BlockShapes.REPORTER,
    [BlockOpcodes.OPERATOR_LT]: BlockShapes.BOOLEAN,
    [BlockOpcodes.OPERATOR_EQUALS]: BlockShapes.BOOLEAN,
    [BlockOpcodes.OPERATOR_GT]: BlockShapes.BOOLEAN,
    [BlockOpcodes.OPERATOR_AND]: BlockShapes.BOOLEAN,
    [BlockOpcodes.OPERATOR_OR]: BlockShapes.BOOLEAN,
    [BlockOpcodes.OPERATOR_NOT]: BlockShapes.BOOLEAN,
    [BlockOpcodes.OPERATOR_JOIN]: BlockShapes.REPORTER,
    [BlockOpcodes.OPERATOR_LETTER_OF]: BlockShapes.REPORTER,
    [BlockOpcodes.OPERATOR_LENGTH]: BlockShapes.REPORTER,
    [BlockOpcodes.OPERATOR_CONTAINS]: BlockShapes.BOOLEAN,
    [BlockOpcodes.OPERATOR_MOD]: BlockShapes.REPORTER,
    [BlockOpcodes.OPERATOR_ROUND]: BlockShapes.REPORTER,
    [BlockOpcodes.OPERATOR_MATHOP]: BlockShapes.REPORTER,
}