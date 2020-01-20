var HIRA_A = 0x3042;
var HIRA_I = 0x3044;
var HIRA_U = 0x3046;
var HIRA_E = 0x3048;
var HIRA_O = 0x304A;

var HIRA_KA = 0x304B;
var HIRA_KI = 0x304D;
var HIRA_KU = 0x304F;
var HIRA_KE = 0x3051;
var HIRA_KO = 0x3053;

var HIRA_SA = 0x3055;
var HIRA_SHI = 0x3057;
var HIRA_SU = 0x3059;
var HIRA_SE = 0x305A;
var HIRA_SO = 0x305C;

var HIRA_TA = 0x305F;
var HIRA_CHI = 0x3061;
var HIRA_TSU = 0x3063 + 1;
var HIRA_TE = 0x3066;
var HIRA_TO = 0x3068;

var HIRA_NA = 0x306A;
var HIRA_NI = 0x306B;
var HIRA_NU = 0x306C;
var HIRA_NE = 0x306D;
var HIRA_NO = 0x306E;

var HIRA_HA = 0x306F;
var HIRA_HI = 0x3072;
var HIRA_HU = 0x3075;
var HIRA_HE = 0x3078;
var HIRA_HO = 0x307B;

var HIRA_MA = 0x307E;
var HIRA_MI = 0x307F;
var HIRA_MU = 0x3080;
var HIRA_ME = 0x3081;
var HIRA_MO = 0x3082;

var HIRA_YA = 0x3084;
var HIRA_YI = 0x3085;
var HIRA_YU = 0x3086;
var HIRA_YE = 0x3087;
var HIRA_YO = 0x3088;

var HIRA_RA = 0x3089;
var HIRA_RI = 0x308A;
var HIRA_RU = 0x308B;
var HIRA_RE = 0x308C;
var HIRA_RO = 0x308D;

var HIRA_WA = 0x308F;
var HIRA_WI = 0x3090;
var HIRA_WU = HIRA_U;
var HIRA_WE = 0x3091;
var HIRA_W_O = 0x3092;

var HIRA_GA = HIRA_KA + 1;
var HIRA_GI = HIRA_KI + 1;
var HIRA_GU = HIRA_KU + 1;
var HIRA_GE = HIRA_KE + 1;
var HIRA_GO = HIRA_KO + 1;

var HIRA_ZA = HIRA_SA + 1;
var HIRA_JI = HIRA_SHI + 1;
var HIRA_ZU = HIRA_SU + 1;
var HIRA_JE = HIRA_SE + 1;
var HIRA_ZO = HIRA_SO + 1;

var HIRA_DA = HIRA_TA + 1;
var HIRA_DI = HIRA_CHI + 1;
var HIRA_DU = HIRA_TSU + 1;
var HIRA_DE = HIRA_TE + 1;
var HIRA_DO = HIRA_TO + 1;

var HIRA_BA = HIRA_HA + 1;
var HIRA_BI = HIRA_HI + 1;
var HIRA_BU = HIRA_HU + 1;
var HIRA_BE = HIRA_HE + 1;
var HIRA_BO = HIRA_HO + 1;

var HIRA_PA = HIRA_BA + 1;
var HIRA_PI = HIRA_BI + 1;
var HIRA_PU = HIRA_BU + 1;
var HIRA_PE = HIRA_BE + 1;
var HIRA_PO = HIRA_BO + 1;

/*
 * Repeat the above pattern but for katakana character code points.
 *
 * It is tempting to just declare an initialization function, but this is
 * just static and faster on page load times.
 */

var KATA_A = 96 + 0x3042;
var KATA_I = 96 + 0x3044;
var KATA_U = 96 + 0x3046;
var KATA_E = 96 + 0x3048;
var KATA_O = 96 + 0x304A;

var KATA_KA = 96 + 0x304B;
var KATA_KI = 96 + 0x304D;
var KATA_KU = 96 + 0x304F;
var KATA_KE = 96 + 0x3051;
var KATA_KO = 96 + 0x3053;

var KATA_SA = 96 + 0x3055;
var KATA_SHI = 96 + 0x3057;
var KATA_SU = 96 + 0x3059;
var KATA_SE = 96 + 0x305A;
var KATA_SO = 96 + 0x305C;

var KATA_TA = 96 + 0x305F;
var KATA_CHI = 96 + 0x3061;
var KATA_TSU = 96 + 0x3063 + 1;
var KATA_TE = 96 + 0x3066;
var KATA_TO = 96 + 0x3068;

var KATA_NA = 96 + 0x306A;
var KATA_NI = 96 + 0x306B;
var KATA_NU = 96 + 0x306C;
var KATA_NE = 96 + 0x306D;
var KATA_NO = 96 + 0x306E;

var KATA_HA = 96 + 0x306F;
var KATA_HI = 96 + 0x3072;
var KATA_HU = 96 + 0x3075;
var KATA_HE = 96 + 0x3078;
var KATA_HO = 96 + 0x307B;

var KATA_MA = 96 + 0x307E;
var KATA_MI = 96 + 0x307F;
var KATA_MU = 96 + 0x3080;
var KATA_ME = 96 + 0x3081;
var KATA_MO = 96 + 0x3082;

var KATA_YA = 96 + 0x3084;
var KATA_YI = 96 + 0x3085;
var KATA_YU = 96 + 0x3086;
var KATA_YE = 96 + 0x3087;
var KATA_YO = 96 + 0x3088;

var KATA_RA = 96 + 0x3089;
var KATA_RI = 96 + 0x308A;
var KATA_RU = 96 + 0x308B;
var KATA_RE = 96 + 0x308C;
var KATA_RO = 96 + 0x308D;

var KATA_WA = 96 + 0x308F;
var KATA_WI = 96 + 0x3090;
var KATA_WU = 96 + HIRA_WU;
var KATA_WE = 96 + 0x3091;
var KATA_W_O = 96 + HIRA_W_O;

var KATA_GA = 96 + HIRA_GA;
var KATA_GI = 96 + HIRA_GI;
var KATA_GU = 96 + HIRA_GU;
var KATA_GE = 96 + HIRA_GE;
var KATA_GO = 96 + HIRA_GO;

var KATA_ZA = 96 + HIRA_ZA;
var KATA_JI = 96 + HIRA_JI;
var KATA_ZU = 96 + HIRA_ZU;
var KATA_JE = 96 + HIRA_JE;
var KATA_ZO = 96 + HIRA_ZO;

var KATA_DA = 96 + HIRA_DA;
var KATA_DI = 96 + HIRA_DI;
var KATA_DU = 96 + HIRA_DU;
var KATA_DE = 96 + HIRA_DE;
var KATA_DO = 96 + HIRA_DO;

var KATA_BA = 96 + HIRA_BA;
var KATA_BI = 96 + HIRA_BI;
var KATA_BU = 96 + HIRA_BU;
var KATA_BE = 96 + HIRA_BE;
var KATA_BO = 96 + HIRA_BO;

var KATA_PA = 96 + HIRA_PA;
var KATA_PI = 96 + HIRA_PI;
var KATA_PU = 96 + HIRA_PU;
var KATA_PE = 96 + HIRA_PE;
var KATA_PO = 96 + HIRA_PO;


var HIRA_N = 0x3093;
var HIRA_tsu = 0x3063;

var KATA_N = 96 + HIRA_N;
var KATA_tsu = 96 + HIRA_tsu;


var HIRA_FU = HIRA_HU;

/*
 * katakana-specific syllables
 */
var KATA_VU = -1;
var KATA_VA = -2;
var KATA_VI = -3;
var KATA_VE = -4;
var KATA_VO = -5;
var KATA_FA = -6;
var KATA_FI = -7;
var KATA_FU = KATA_HU;
var KATA_FE = -8;
var KATA_FO = -9;
var KATA_TSA = -10;
var KATA_TSI = -11;
var KATA_FYU = -12;
var KATA_TSE = -13;
var KATA_TSO = -14;
var KATA_