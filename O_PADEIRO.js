// Script: O PADEIRO script de utilidades

function O_PADEIRO_UTL(thisObj) {
	var vStr = '';
	// Declaração da versão do script 'O Padeiro'
	var PAD_v = '1.4';

	PAD_TEMPLATES_ICON = {
		normal: '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00 \x00\x00\x00 \b\x06\x00\x00\x00szz\u00F4\x00\x00\x00\tpHYs\x00\x00\x0E\u00C3\x00\x00\x0E\u00C3\x01\u00C7o\u00A8d\x00\x00\x00\x19tEXtSoftware\x00www.inkscape.org\u009B\u00EE<\x1A\x00\x00\x05\u0087IDATX\u0085\u00B5\u0097m\u0088TU\x18\u00C7\u00FF\u00CF\u0099I\u00D1\u00DA%s\u00D6euB\u00B1u\u0098{\u00CE\u00CE$\u009A\u0081\x14\u00B5\u00C2j\u00D9\u0086\x06\u0092\u0082\x1F*\u008D]\u00CC\u00DE\u00C8\x0F\u009A\u00F5!\u008B\u0092\u00ECE\u00C2|c\t\u00D3\u00A0\f\u00D1RS\u00C1\u0097h\u00CB ,3\u00D8\u00DD{\u00AFn%\u009A\u00A3\u00C5\u008E\x14k\u00C5\u00EA8s\u00FE}\u00F0^\u009B\u00C6]wG\u00E9\u00F9x\u00EF9\u00CF\u00FF\u00F7\u00BC\u009C\u00E7\u009E+\u00B8\x06s\x1Cg\u00B4Rj1\u00C9\x07\x01\u00D4\x008+"\u00FBI\u00BE\u00E1y\u009E[\u008E/)W\u00DC\x18s\x1F\u00C9-\x00<\x00\x1BI\u00FE\u00AC\u0094\x1Ae\u00AD\u009D+"\u00F5"\u00D2\u00EC\u00BA\u00EE\u00A6\u00E2=\u00F1x|Hee\u00E5s\x00\u00EE$y\u00DCZ\u00FB\u00D6\u00B1c\u00C7\u00CE\u0094\r\u00E08N\u00A3\u0088l\x03\u00B0\u00D2\u00F3\u00BC\x17\x01\u00B0\u00E4\u00FD\x13J\u00A9w\x01,t]\u00B7\x05\x00&N\u009CxCOO\u00CFA\x11\x19\x01`\x07\u00C9\u00C9\x00n+\x14\n\u00B7\u0087\x10\x03\x16\u00D7Z\u009F\u00D7Z/+z\u00AC\u00D2\u00E9t\u00BC\u00BE\u00BE>\x1A>\u00D0Z\u00CF3\u00C6\u00E4\u008D1\u00CD\x00`\u008CY\u00A4\u00B5>\u0093H$b\u00E1\x1E\u00AD\u00F5!\u00AD\u00F5\u00DB\x00\u00A0\u00CA\u008C\u00FCu\u00CF\u00F3\u0096\x05\u008Eo\u00D1Z\x7F\u0095\u00CF\u00E7Ouuu\u00B5%\u0093\u00C91\x00\u00E0y\u00DE\u00FB$\u009B\x00\u00AC5\u00C64\u0093\u009CCrMgg\u00E7\u00D9\u00C0\u009D\x15\u0091o\x00\u008C\x1D\x10@_\u00E2$\u00F7\x03\u00B8\u00C9Z{\u0087\u0088d\u0094R_\u00F4\x06\x01`\u0092R\u00EAp\u00E8/\u0091H\u00C4H\u00CE\x04\u00F0-\u00D0O\x0F\u00F4&>~\u00FC\u00F8\u009Bs\u00B9\u00DC>\x00\u0083\u00F2\u00F9|Cgg\u00E7\u00D9\u00DA\u00DA\u00DA\u00C1\u0083\x07\x0F\u00DEF2\x15\u0089D\u00A6\u00B4\u00B7\u00B7\x1F\x07.\u0095\x03\u00C0{\x00\u00B6\u0092\u00DC\x04`\u0082\u0088<\t\u00E0\u00E4\u00B9s\u00E7\u00A6d2\u0099\u009E>\x01\u00FA\u0089\u00BC\u0082dc4\x1A\r\u00D3\u008A\\.7$\x1A\u008Dn%Yc\u00AD\u009Dr\u00F4\u00E8\u00D1\x13%\x10\x00p\u0098\u00E4\u00E6\u00EA\u00EA\u00EA\u00D5\u00AD\u00AD\u00AD\u00F9>3`\u008C\u00B9\u009F\u00E4\u00A7\u0081\u00F8\u00CB%\u0091O\u00BAZ\u00D6\x02\u00FB\u00A58\x13\u00C6\u0098\u00C7\x00\u00BCg\u00AD}\u00C6\u00F7\u00FD\u00B5\u00C5\x0B\u00AF\x00\u00E8M\u00BC(\u00F2\b\u00C9\x05$/\x02@$\x12\u00F9\u0090\u00E4.k\u00ED\u00E6p\x7F4\x1A\x15\u0092\u00CBI\u008E+\u00CED_\x10\u00FF\x01\u00E8O<\u00ACy\u00B8^k}\u0084\u00E4\x07\u00BE\u00EF\u00BFS\u00EC\'\x1E\u008F\x0F\u00A9\u00A8\u00A88 "#\u00FB\u0083\u00B8|\n\x1C\u00C7i$\u00B9\x1D\u00C0\u008A\u0081\u0088_\u00CD2\u0099L\x0F\u0080C\x00\u00C6\x14\u009F\x0E\u00D7u7\u0092lRJ\u00AD2\u00C6<z\x19\u00C0\x18s\u00DFU\x1An\u0082\u00884\rT\u00BC\u00D8H\u00EE\x13\u0091\x1FK\u008F\u00A8\u00B5\u00F6i\u0092-\u00C6\x18\u00AD\x1C\u00C7\x19\x1D\u00CC\u00F6\u0095\u00A1x*\u0095\x1A\x16v{\u00E0\u00EBb\u00B9\u00E2\x00 "=\u00DD\u00DD\u00DD3K!|\u00DF_\'"_Zk\x17+\u00A5\u00D4\x12\x00~0\u00DB\u0091J\u00A5\u0086\x15\n\u0085\x03\x00""\u00F2\u00C0\u00B5\b\x17[&\u0093)\u0086\u00D8\x03 \x12\u00BC\u00FAH)\u00D5\x10%\u00D9("\u00AF\u00E1\u00D2\u0087E\x15\n\u0085\u00CF\x10\u00D4|\u00E8\u00D0\u00A1\u00F9\\.\u0087\x00l\u00AC\u00B5v\u00BA\u00EB\u00BAk\x1C\u00C7yHD\u00A6\x03\u00B8U)5[k\u00ED\u00F4\x12\u00FDd\u0092\u00C7C\u0088\u008A\u008A\u008A\u00E7E\u00E4\u00FBt:]\u00D3\u00D6\u00D6\u0096\x11\u00913\u00D6\u00DA\u0098\x02P#"\'\x00\u00A0\u00AE\u00AEn\x14\u0080\u00BBH\u00CE\u00BF\u0096\u009A\u00F7e\u00C9dr\u00B8\u0088l\x00\u00F0u[[\u00DBi\x00\u00B0\u00D6\u008E\x05p:\n\u00E0,\u00C9\u0091\x00\x10\u008B\u00C5~\u00ED\u00EA\u00EA\u00F2DdE<\x1E\u009FQ\u00EC$\x18*k\x00\u00C0\u00F7\u00FD\u00ED\x00\u00B6k\u00AD\'Yk\u00B7\u0094\x1EC\x00p\x1Cg\u00A5\u0088\u008CM&\u0093\u00C3\u0095R\u009F\x03(\u0088\u00C8L\x04\u0099&\u00F9\u00B8\u0088\u00ECV"\u00B2\x1F\u00C0\\\x00hmm\u00CD\u0093|\x00@mee\u00E5\u00CE\x0B\x17.\f\u00B9\u00CE\u00E0\u008B\u00C5\u00A7\u00BA\u00AE\u00FB;\x00h\u00AD_UJ\u008DSJ\u00BD\u00A9\x00\u00AC y\u008F\u00E38\x0B\u0083\u00E8N\u0092\u00AC\x07P\u00AB\u0094\u00DAv\u009D\x00w\u00F7"\u00FE\x12\u0080E\x00\u00E6ttt\u009CR\u00AE\u00EBz$\u009B\u0095R\u00AB\u00B4\u00D6\u00F3\u008B!H\u00D6\x00\x00\u00C9\u00B2nNA\u00CD\u00A7\x028\u00D2\u008B\u00F8R\u0092\u00B3\\\u00D7\u00DD\x0B\x04\u0083\u00C8\u00F7\u00FD\x0FH6\u008BH\u008B\u00D6zA\b!"\u00F7\x028\x0E\u00E0\u009Dt:}\u00E3@\u00C4S\u00A9\u00D4\u00B0H$\u00B2\x17@\u00DEZ;-\x147\u00C6,\x01\u00F0\u0082\u0088\u00CC\u00F6}\x7Fw\u00B8\u00FE?\u0091i\u00AD\u00E7\u008BH\x0B\u00C9\u00A7<\u00CF[\x0F\\\u00BA\x01\u008BH+\u0080\u009F\u0094RK\u00F3\u00F9\u00FC\u00E5{`\u00E9\u00C7HDn\x10\u0091\u00F5(I\u00BB1f\t\u00C9WD\u00E4a\u00D7uw\x16k^\u0091\u00DA~ \u00C6\f \tG\x06*\u00DE+\u00C0\x00 ~+\x14\n\u00B3\x06\r\x1A\u00D4\x13\u00AE\u00B7\u00D6\x0E\'\u00B9\x07\u00C0\u009F\u00E5\u0088\x03}\u00DC\t=\u00CF\u00DB\x10\u00F4\u00C4\u00EA^zbD$\x12\u00D9,"\u00B9\u00F6\u00F6\u00F6?\u0082-\x1F\x03\u00F8\u00BB\u00B4\u00E6\u00FD\u0089\x03\u00FF\u00CE\u00E5+,\u009B\u00CD\u00FEPUU\u0095\x11\u0091uUUU]\u00D9l\u00F6p6\u009B\u00ED\u008E\u00C5b;D\u00E4Yk\u00ED\u00B4\u00EA\u00EAj\u00DFZ\u00FB\t\x00\u0088H\u0083\u00EF\u00FBe\u0089\u00F7\u0099\u0081\u00FE2\x11\u00CC\u0089\u0091\u00D6\u00DA\u00EF\x00\u00FC%"\r\u00E5F^\u0096i\u00AD\u00E7\x1Bc\u00F2!D`\u0091D"1\nE}d\u008CY\u00A2\u00B5\u00BE`\u008C\u0099q\u00A5\u0097\u00EB4cL\u00931&\x1FN\u00CC\x12SZ\u00EB\u00E5Z\u00EB\u00F3\u008E\u00E34\u0096\u00E3\u00B7\u00DC\x7F\u00C3GD\u00A4\x05\u00C0A\x00\u009B\u0095R\u0099B\u00A1P\x0B`\u009ERj\x1C\u00809\u00E1\u0084\u00FB_\x00\x00\u00A0\u00AE\u00AE\u00CE\u00B1\u00D6.\x06\u00D0\x00\u00A0JD\u00CE\u0090\u00DC\u00A5\u0094z\u00B3\u00A3\u00A3\u00E3T\u00B9\u00FE\u00FE\x01\u00B5Fe\u00F8\u009A"\u00BE,\x00\x00\x00\x00IEND\u00AEB`\u0082',
		hover: '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00 \x00\x00\x00 \b\x06\x00\x00\x00szz\u00F4\x00\x00\x00\tpHYs\x00\x00\x0E\u00C3\x00\x00\x0E\u00C3\x01\u00C7o\u00A8d\x00\x00\x00\x19tEXtSoftware\x00www.inkscape.org\u009B\u00EE<\x1A\x00\x00\x05$IDATX\u0085\u00B5\u0096}hUu\x18\u00C7?\u00CF9\u009B9\u00EF\u009D\u00EFI\u00CBJY\u008A\x18D\x10)XQ\x0E4\u00D3E\x06\u00D2\u00DC\u00DD\u00A0\u00D2\u0098\u00D8+Y\u00A0\u00A9\x7FdQ\u00A2\x19"\u00E6[C\u00D4I\u00BBg\\\u0094\u00ACTP\x0B+\u008D(T"\u00D0\u0088j\u00BDh\u00EA\x1F#u;g\u00D7t\u00F7|\u00FBc;\u00F3z\u00F7\u00E2\u00AE\u00E2\u00F3\u00E7=\u00CFy\u00BE\u009F\u00E7\u00FB{\u00CE\u00EF>\u00C6uD}Z\u00A3\u00DC\u0090\u0085\x12O\x00%@\u0093\u00E0\x00\u00E2\u00FD\u00AAb;\u009EO-\u00CB[\u00DC\u00D74\x07R\u0088\x13r\u00D8\u00E6\u008A\u00DF30\u00D2\u00A0\n\u0098,\u0098W\x15\u00B7\u00BA\u00ECwRRQ\u00A6\u0095\x05\u0084L\u00C4h\u00C4\u00F8 \x11\u00B3\u00D3y\x03x\u0081\u00CA\x11;\u0081\u00D5\u00951\u0096\u009A\u0099\u00B2\u009F7\u00B4\u00E8\x05\x19\x1F\u009A\u00F1be\u00CCj\x01>\u0092\n\x07\x06\x1C\x02F\x18|*\u0098\x04\u00DC\u008Dq_"f\u00A7\u009D\u00BC\u00C5\u00C5\u008AD\u00DC\u0096\u0098\u0099\u0096I\u00CE\u00C7\u00AD\u00BA\u00E3\u00A0T\x00PYl\x1B\rj$64\x04\u009A\x070(\u00E0\x15\u00E0.\u0085L\u00AC\u008C\u00DB\u0082_b<\b4J\u00BC\x01\u00D0\'\u0080\u00AB\u00C4\u008Bm\x19@\u00EA\u0082\u0086\u008Ek\u00E5\x1B7\u00E4\u00E4\u00D9\u0080\u009F\u00BC\u00B4F\x03T\u00C6mk6\u0084`\u00B6\x19\u00EB\u00AB\x06Z\x13\u00C02\u00B3P\u00F0\u009D#J\u00FB\x04\u00D0\u0093x\u00C6\u00E5\x00"\x1E\x1A\x0F\x00\u00A7\u00C8p\u00B0;\b`BF\x1C\u0089\u00EA%\u009B5\u00DC`fh\u00FC\x00\u00D7\u0098\u0081\u00EE\u00C4\u00B7\u009E\u00D3\u00E0\u00FE\u0085\u00EC\x07\u00FA)dJ\u00D5@k\u00DA+\u00DDr!`\'poX@Yu\x7Fk\x04h\u00F05G\u00B0\x19\u00D8\x11\x1Au\x0E\u00DC\u008Fx\t\u00F8\u00CB\u008DQVa\u0096\u00EE\x11\u00A0\u00D7\u00CE\u00A18\u00CCP\u008Eh\u008A\u00F2\u009DB\u008A\b\u00D9\u0081Q\u0082KY\u00A2\u00C8\u00FE\u00CC\u0081\x008"\u00F0Jb\u00AC+3k\u00EB\u00D1\u0081\u00A4\u00AF\u00C7\r>\u00C1X\u0091\u0088\u00D9\u00DB9\u009DO\u00E8\u00CD\u00B5\u008E\u00F8;\u00DB\t\u00CF\u00D7s\u00C0f\u0089W\u00AB\u008AmCvb\x17\u0080\u00EE\u00C4\u00B3:w\u00CDa~F\\\x060Q\u00EF\u00C0\u00EE\u008C\u00E1u:\x01\u0086X\x0E\u008C\u00CDv\u00A27\u0088\u00AB\u00C4=_i/\u00D0[\u00D1o\u00A9\x0B\x1A\u00EA\u00F9:\u00EA\u00F9\u00FA1\u00D9\u00AC\u00E1\u00D9\u00F9\u009E\u00AFcI_\u00AF\u00E5\u00D6IIE^\u008B\u00BE\u00F5|\u00FD\x11\rf\x04\u00E1\u00F9jK\u00B6\u00E8\u00C5,\u00E0\u008E\u0087\u0081\u00CA\rv!Vv\u00D7y4p\u00DD\u0092\u00E7D\u0085Y\x1A\u00E3{`t\u00F6\u00D7\u0091\u0088\u00DB6\u0083\x1A3\u00D6&}=\u00DB\tP\u00EFkZ/\x03w\u00BF\x195}\x15\u00CF\u0089\u00FD\u00C0\u00AF]>Q\u00F1\u008AAm\u00AAE\u00F78\u00F5i\u008Dr \x05\u00AC\u008E\u00C4\u00EB\u00CFkH4\u00ED\x00\u00D1\u0099\u00E7\x1D"\u00ED\u00C6\u0098\u00D9\x05\u00A2\u00D86\x02_g\u008C\u0085\u008E\x13\u00B2\b\u00F8\u00B92\u00C6\u00D2H\u00DC)\u00E0\x0B\u00C0u3\u00CC\u00B8.\u00E1\u00AC\u00A80\u00CB\u0086\u00D8\u009B\u0092\u00DC\u008EGI`J\x01\u00A2\u00DC\u008C\u00F7\u00A2\u00BB\u00DDi\u00E5s\u00D4~\u00E6AH[\u00FF\u008E\u00F4\u00FA\u008B*u.3=Ql\u00EB\u0093\u0081\u009E\u00B2\u0090\u00E9\u00C0\u009D&*\u00BC\x16\u008D\u00CF\x156\u0098$h\u008C \x1A\x02\u00BD)q\u00F4R\u009A\x12\u00E0\u0094\u00C1i\u00C1p\x07(A\u00FC\t0.\u00CDH\u00C4Cf\u00CC\u00BD\u00CE3\u00EF6\u00EA\u009A5Lb\x0B\u00C6\u00E1\u00EA"\u00FE\x01\u0090Q\u008A\u00F8\u00A7\u0080\u00F6e\u00E2v\u0080\u00DB\u008A8s&\u00E0\u0084\u00C4\u00CA\u0094\u00F4dp\u00FEJ\u0091\u008EKe=@U\u00CCv\x01\u00BB<_\x13d\u00A4\u00AA\u00E2\u00B6&W\u00D4\u00F3\u00B5\x1A(\u00ADk\u00D6\u00B0~\x0E_\x02\x19\u00B7\u008D\u0099\u0091\u00D3\x04<o\x0E{\x1C\u00C1\x01\u00DA\u0097\t\u00CA\u00CC\u00DA\u00E42\u00C3`L[\u00C0g\x05\u00FD(\u00BA\u00A1\u00D6\x1D\u00AE\u0088g\u0098Z1\u00C8\u00FE\x05\x18\x17\u00F0.0V\u00C6*\u00A7@\u00AC\x04\x1E\u0089.\u0087\u00EA"\u00FB+t\u0099l0\u00A6 d\u00E7\r\x01\u0088\u0087s\u00C5;.\u00B9\u00D7C\u0098\u009D\x18`\'\u009D\u008Ab;a0\u00CF\u008C\u00B5^\u00A0\u00B9\u00D9\x10\x18%\x00\u008E\u00E5\u00B79\u00D55k\x180\x158\u00D6E\\,\u00C6\u0098U\x1D\u00B7}\u00ED&\x01\u0095q\u00DB\u008E1\x0FQ\u00EB\x05\u009A\x1FA\u00B8.\u008F"\x1A%\u00D6l\u0097b}\x11\u00AF?\u00AF!\u00B78\u00EC3h\u00BB\x14\u00F2X\u00A7\u00B8\u00AFE\u0088%\x18\x15\u0089\u0098\u00ED\u0089\u00F2\u00AF\u00EA\u00CC\x0B4\x17Q\u008B\u00F1r"f\u009B\u00A0}\x03v2|%\u00F8\u00CD\u008C\u00C5!t\u00EE\u0081\u00B9\x7FF\u00AEQ\u00A8\u0090M]l\u00F7\u00B5\bx\x07\u00E3\u00E9D\u00CC>\u00CB\u00D6\u00ECbmo\x10\u00C0\u00E8>\u0098p\u00AC\u00AF\u00E2\u00DD\x02\\\x13B\u009C\u00C5aVx\u0099t\u0094_h\f\u00CB\u00B8\u00EC\x05Z\u00F2\x11\u0087\x1Ev\u00C2D\u00CC\u00B6t\u00CC\u00C4\u00BA.3\x01#$\u00BC\u00CC .U\x0F\u00B6s\x00\u00A1K\u0083A\u00D0\u00E5\u00CC\u00AF!\u00DE\u00A3\x03}q"\u009A\t\u00C4f t3L\u00C9W\u00BCO\u00E1\x05\u009A\u00EB\u00F9j\u008B\u009C\u0088 \u0092\u00BE\u008E{\u00BE\u00E4\x05:\u009C\u00BA\u00A0\u00A1\u009D\u00F9\u00BE\x16y\u00BE\u00FE\u00F3\x02=yC\u00C2\u00D7\u0082HIn\u00AAU#%u\u00BAxS\u00C4\u00B3 jr\u00D7\u00A9(\u0096I\u008E\u00E7k\u00B9\u00E7\u00EB\u00A2\x17\u00A8<\u009F\u00BAy\u00DDp\r\u00BE\u009E\x11\u00D4\n\x0E\u0099\u00E1\u00998\x15\u008A1f\u00CC\x01\u00C6\u00860;\u00BA\u00E1n\n\x00@C\u008B\u00C6\u00CBX\bL\x01n\x05N\u009B\u00B1[\u00C6\u00AA\u00C4\x00;\u0099o\u00BD\u00FF\x01i\u0088&\\\u00B6\u00B56u\x00\x00\x00\x00IEND\u00AEB`\u0082',
	};
	
	PAD_FONTES_ICON = PAD_TEMPLATES_ICON;
	PAD_PASTAS_ICON = PAD_TEMPLATES_ICON;
	PAD_RENOMEAR_ICON = PAD_TEMPLATES_ICON;
	PAD_ORGANIZAR_ICON = PAD_TEMPLATES_ICON;
	PAD_BUSCAR_ICON = PAD_TEMPLATES_ICON;
	PAD_ATALHOS_ICON = PAD_TEMPLATES_ICON;

	// Objeto que armazena as configurações padrão (default) do Padeiro
	var defPadObj = {
		configName: 'default config',           // Nome da configuração (usado para identificação no log)
		exemple: '',                            // Exemplo de texto de entrada (será mostrado na interface se o template não tiver um exemplo próprio)
		tip: '',                                // Dicas para o usuário sobre como usar o template

		compName: '',                           // Nome da composição principal do template (a composição que será duplicada e manipulada)
		prefix: '',                             // Prefixo que será adicionado ao nome de cada template gerado
		refTime: 0,                             // Tempo de referência para os templates gerados (em segundos)
		separator: '---',                       // Separador usado para dividir múltiplas linhas de texto em uma única entrada
		textCase: 'upperCase',                  // Define o formato do texto de entrada: 'upperCase' (maiúsculas), 'lowerCase' (minúsculas) ou 'titleCase' (título)
		inputLayers: null,                      // Array que define as camadas do template que receberão o texto de entrada (null por padrão)
		inputFx: null,                          // Objeto que define informações sobre efeitos aplicados às camadas de entrada (null por padrão)

		importPath: '~/Downloads',              // Caminho padrão para importar novos footages
		outputPath: [                           // Lista de caminhos para salvar os renders dos templates gerados
			'~/Desktop'
		]
	};

	#include 'source/globals.js';                   // Inclui variáveis globais (usadas em todo o script)
	#include 'source/layout/main ui functions.js';  // Inclui funções para criar a interface do usuário
	#include 'source/libraries/JSON lib.js';        // Inclui funções para trabalhar com dados JSON
	#include 'source/libraries/FUNC lib.js';        // Inclui funções utilitárias gerais
	#include 'source/libraries/PROT lib.js';        // Inclui funções que estendem objetos JavaScript (prototype)
	#include 'source/libraries/EXPS lib.js';        // Inclui uma biblioteca de expressões para animações
	#include 'source/libraries/ICON lib.js';        // Inclui ícones codificados para a interface

	// utilidades com interface
	#include 'source/layout/Utils/o padeiro templates ui.js'; // Sistema de templates
	#include 'source/layout/Utils/o padeiro folders ui.js';   // Lista de pastas de produção
	#include 'source/layout/Utils/o padeiro maker ui.js';     // Editor de templates
	#include 'source/layout/Utils/find ui.js';                // Busca em layers de texto

	// configurações iniciais de uma nova produção
	var defaultProdData = {
		PRODUCTIONS: [
			{
				name: 'nome...',
				icon: solTogIcon.dark,
				templatesPath: 'edite a pasta de templates...'
			}
		]
	}

	// ordena as produções por nome
	function sortProdData(prodDataObj) {
		return prodDataObj.sort(function (a, b) {
			if (a.name < b.name) return -1;
			if (a.name > b.name) return 1;

			return 0;
		});
	}

	// retorna os nomes das produções
	function getProdNames(prodDataObj) {
		var prdNames = [];

		for (var i = 0; i < prodDataObj.length; i++) {
			prdNames.push(prodDataObj[i].name);
		}
		return prdNames;
	}

	// salva os dados das produções
	function saveProdData(prodDataArray) {
		var prodData = { PRODUCTIONS: prodDataArray };
		var configFile = new File(scriptMainPath + 'O_PADEIRO_config.json');
		var configContent = JSON.stringify(prodData, null, '\t');
		writeFileContent(configFile, configContent);
	}

	// atualiza os dados das produções
	function updateProdData(configFile) {

		var prodData;
		if (!configFile.exists) padProdFoldersDialog(defaultProdData.PRODUCTIONS); // Chama a janela de configuração.

		$.sleep(300);

		try {
			var configContent = readFileContent(configFile);            // Lê o conteúdo do arquivo de configuração JSON
			prodData = JSON.parse(configContent);                   // Analisa o conteúdo JSON e o armazena no objeto 'templateData'
			prodData = sortProdData(prodData.PRODUCTIONS);

		} catch (err) {
			prodData = defaultProdData.PRODUCTIONS;
		}

		return prodData;
	}

	function changeIcon(imageIndex, imagesGrp) {
		for (var i = 0; i < imagesGrp.children.length; i++) {
			imagesGrp.children[i].visible = i == imageIndex;
		}
	}

	function populateMainIcons(prodDataArray, imagesGrp) {

		while (imagesGrp.children.length > 0) {
			imagesGrp.remove(imagesGrp.children[0]);
		}

		for (var i = 0; i < prodDataArray.length; i++) {
			var newIcon = imagesGrp.add('image', undefined, undefined);
			try {
				newIcon.image = eval(prodDataArray[i].icon);
			} catch (err) {
				newIcon.image = defaultProdData.PRODUCTIONS[0].icon;
			}
			newIcon.helpTip = prodDataArray[0].name;
			newIcon.preferredSize = [24, 24];
			newIcon.visible = i == 0;
		}
	}

	var PAD_ui = {
		btnGrpArray: [],
		sectionGrpArray: [],
	};

	function PAD_buildUi(window, structureObj, iObj) {

		var sectionCounter = 0;
		var PAD_prodArray = updateProdData(new File(scriptMainPath + 'O_PADEIRO_config.json')); // dados das produções
		templatesPath = PAD_prodArray[0].templatesPath;
		templatesFolder = new Folder(PAD_prodArray[0].templatesPath); // pasta de templates.

		iObj.mainGrp = window.add('group'); // Grupo principal
		iObj.mainGrp.spacing = 16; // Espaçamento entre elementos do grupo
		iObj.sectionGrpArray.push(iObj.mainGrp);

		for (var sec in structureObj) {
			var section = structureObj[sec];

			if (sectionCounter > 0) {
				var div = iObj.mainGrp.add("panel"); // Separador visual
				div.alignment = 'fill'; // Define o alinhamento do painel para preencher o espaço.
			}

			var sectionGrp = iObj.mainGrp.add('group', undefined, { name: 'sectionGrp' }); // Grupo de botões superior
			sectionGrp.alignment = ['center', 'top']; // Alinhamento central
			sectionGrp.spacing = 8; // Espaçamento entre botões
			iObj.sectionGrpArray.push(sectionGrp);

			for (var btn in section) {
				var button = section[btn];

				var btnGrp = sectionGrp.add('group', undefined, { name: 'btnGrp' }); // Grupo de botões superior
				iObj.btnGrpArray.push(btnGrp);

				var btnImgGrp = btnGrp.add('group', undefined, { name: 'btnImgGrp' }); // Grupo de botões superior
				btnImgGrp.orientation = 'stack'; // Alinhamento central

				var tempBtn = btnImgGrp.add('iconbutton', undefined, undefined, { name: 'btn', style: 'toolbutton' }); // Botão "Abrir O Padeiro"
				tempBtn.size = [0, 0];
				tempBtn.visible = false;

				var newHoverImg = btnImgGrp.add('image', undefined, button['icon']['hover'], { name: 'img1' }); // Botão "Abrir O Padeiro"
				newHoverImg.preferredSize = [32, 32];
				newHoverImg.visible = false;
				newHoverImg.helpTip = button['tip']; // Dica de ajuda

				var newNormalImg = btnImgGrp.add('image', undefined, button['icon']['normal'], { name: 'img1' }); // Botão "Abrir O Padeiro"
				newNormalImg.preferredSize = [32, 32];
				newNormalImg.helpTip = button['tip']; // Dica de ajuda

				var newLab = btnGrp.add('statictext', undefined, btn.replace(/_/g, ' '), { name: 'lab', truncate: 'end' }); // Texto do botão
				newLab.helpTip = button['tip']; // Dica de ajuda
				setTxtColor(newLab, '#2A2A2A', '#A7F4FF'); // Cor de destaque do texto
				setTxtBtnLink(newLab, tempBtn);

				btnGrp.addEventListener('mouseover', function () { // Ao passar o mouse por cima do texto:
					setTxtColor(this.children[1], '#A7F4FF'); // Muda para a cor de destaque.
					this.children[0].children[2].visible = false;
					this.children[0].children[1].visible = true;
				});

				btnGrp.addEventListener('mouseout', function () { // Ao tirar o mouse de cima do texto:
					setTxtColor(this.children[1], '#2A2A2A'); // Retorna para a cor normal.
					this.children[0].children[2].visible = true;
					this.children[0].children[1].visible = false;
				});

				newHoverImg.addEventListener('mousedown', function () {
					this.parent.children[0].notify();
				});

				iObj[btn] = tempBtn;
			}
			sectionCounter++;
		}
		// Rótulo da versão
		iObj.vLab = window.add('statictext', undefined, 'v' + PAD_v, { truncate: 'end' });
		iObj.vLab.justify = 'center';
		iObj.vLab.helpTip = 'ajuda | DOCS';

		iObj.prodGrp = window.add('group'); // Grupo de botões superior
		iObj.prodGrp.alignment = ['center', 'top']; // Alinhamento central
		iObj.prodGrp.spacing = 4; // Espaçamento entre botões
		iObj.sectionGrpArray.push(iObj.prodGrp);

		iObj.iconGrp = iObj.prodGrp.add('group');
		iObj.iconGrp.orientation = 'stack'; // Layout vertical
		populateMainIcons(PAD_prodArray, iObj.iconGrp);

		iObj.prodDrop = iObj.prodGrp.add('dropdownlist', undefined, getProdNames(PAD_prodArray));
		iObj.prodDrop.selection = 0; // Seleciona a produção padrão.
		iObj.prodDrop.preferredSize = [130, 24];
		iObj.prodDrop.minimumSize = [50, 24];
		iObj.prodDrop.helpTip = "PRODUÇÃO SELECIONADA"; // Dica de ajuda

		window.layout.layout(true); // Aplica o layout

		// Estilização da interface
		setTxtHighlight(iObj.vLab, '#000000', '#A7F4FF'); // Cor de destaque do texto
		setBgColor(window, '#515D9E'); // Cor de fundo da janela

		window.onShow = window.onResizing = function () { // Define uma função a ser executada quando a janela é exibida ou redimensionada.
			PAD_setLayout(this, iObj);
		};
	}

	function PAD_setLayout(window, iObj) {

		var isRow = window.size.width > window.size.height;
		var grpOrientation = isRow ? 'row' : 'column';
		var btnOrientation = isRow ? 'column' : 'row';
		var mainMargin = isRow ? [180, 0, 50, 0] : [4, 60, 4, 20];

		try {
			for (var s = 0; s < iObj.sectionGrpArray.length; s++) {
				var sectionGrp = iObj.sectionGrpArray[s];
				sectionGrp.orientation = grpOrientation;
				// sectionGrp.alignC = isRow ? ['center', 'top'] : ['left', 'center']; // Alinhamento central
			}
			for (var b = 0; b < iObj.btnGrpArray.length; b++) {
				var btnGrp = iObj.btnGrpArray[b];
				btnGrp.orientation = btnOrientation;
				btnGrp.spacing = isRow ? 0 : 8; // Espaçamento entre botões
				btnGrp.children[1].justify = isRow ? 'center' : 'left'; // Alinhamento central
				btnGrp.children[1].size.width = 60;

				if (window.size.width < 120) btnGrp.children[1].size.width = window.size.width - 64;
				if (window.size.width < 80) {
					btnGrp.spacing = 0;
					btnGrp.children[1].size.width = 0;
				}
			}
			iObj.mainGrp.margins = mainMargin;
			iObj.prodGrp.alignment = isRow ? 'left' : 'top';
			iObj.vLab.alignment = isRow ? 'right' : 'bottom';
	
			if (window.size.width < 150) iObj.prodDrop.size.width = window.size.width - 16;
	
		} catch (err) { alert( lol + '#PAD_layout - ' + '' + err.message); }

		window.layout.layout(true);
		window.layout.resize();
	}

	var PAD_mainGrpUiStructure = {
		grp1: {
			templates: {
				icon: PAD_TEMPLATES_ICON,
				tip: 'O PADEIRO:\n\n◖ → abrir interface de templates\n\n◗ → criar novo template'
			},
			fontes: {
				icon: PAD_FONTES_ICON,
				tip: 'RESOLVER FONTES:\n\n◖ → instalar as fontes usadas no template\n\n◗ → fazer o collect das fontes usadas no projeto'
			}
		},
		grp2: {
			pastas: {
				icon: PAD_PASTAS_ICON,
				tip: 'ABRIR PASTAS:\n\n◖ → abir a pasta do último item da fila de render\n\n◗ → abir a pasta do projeto (caso esteja salvo)'
			}
		},
		grp3: {
			renomear: {
				icon: PAD_RENOMEAR_ICON,
				tip: 'RENOMEAR:\n\n◖ → renomear comps selecionadas\n\n◗ → renomear TODAS as saídas de render'
			},
			organizar: {
				icon: PAD_ORGANIZAR_ICON,
				tip: 'ORGANIZAR:\n\nselecione as comps que serão\nRENDERIZADAS primeiro!\n\n◖ → organizar o projeto\n\n◗ → criar estrutura de pastas do projeto'
			}
		},
		grp4: {
			buscar: {
				icon: PAD_BUSCAR_ICON,
				tip: 'BUSCA:\n\n◖ → abrir a BUSCA em layers de texto'
			}
		},
		grp5: {
			atalhos: {
				icon: PAD_ATALHOS_ICON,
				tip: 'APONTAMENTO:\n\n◖ → abrir a planilha do apontamento de projetos no navegador'
			}
		}
	};

	function O_PADEIRO_UI() {

		var PAD_w = {}; // Objeto que representa a janela da interface

		// Cria a janela da interface (ou usa um painel existente)
		if (thisObj instanceof Panel) {
			PAD_w = thisObj;
		} else {
			PAD_w = new Window('palette', 'O PADEIRO'); // Cria uma nova janela
		}

		// Configurações da janela
		PAD_w.margins = 5;      // Margens internas
		PAD_w.orientation = 'stack'; // Layout vertical

		PAD_buildUi(PAD_w, PAD_mainGrpUiStructure, PAD_ui);

		// Adiciona um "ouvinte" de evento ao rótulo de versão (vLab).
		PAD_ui.vLab.addEventListener('mousedown', function () {
			// Este ouvinte será acionado quando o usuário clicar (mousedown) no rótulo.
			var siteUrl = 'https://github.com/jmbillard/PROMO/blob/main/docs/O_PADEIRO/O%20PADEIRO.md#-o-padeiro-script'; // Define o URL do site de documentação.
			openWebSite(siteUrl); // Abre o site de documentação em um navegador web.
		});

		PAD_ui.iconGrp.addEventListener('click', function (c) {

			// Verifica se aconteceu um clique duplo (detail == 2).
			if (c.detail == 2) {

				padProdFoldersDialog(PAD_prodArray); // Chama a janela de configuração.
				prodDrop.removeAll(); // Limpa a lista de produções do menu.

				// atualiza os dados das produções.
				PAD_prodArray = updateProdData(new File(scriptMainPath + 'O_PADEIRO_config.json'));

				// Popula a lista de produções do menu
				populateDropdownList(getProdNames(PAD_prodArray), prodDrop);
				populateMainIcons(PAD_prodArray, this);

				prodDrop.selection = 0; // Seleciona a primeira produção.
				this.layout.layout(true);
			}
		});

		PAD_ui.prodDrop.onChange = function () {

			var i = this.selection.index;
			changeIcon(i, iconGrp);

			templatesPath = PAD_prodArray[i].templatesPath;
			templatesFolder = new Folder(PAD_prodArray[i].templatesPath); // pasta de templates.
			PAD_launchBtn.enabled = templatesFolder.exists; // Habilita / Desabilita o botão "Abrir O Padeiro".

			// Se a pasta de templates não existir.
			if (!templatesFolder.exists) alert(lol + '#PAD_002 - a pasta de templates não foi localizada...');

		};

		// Define a função a ser executada quando o botão "Abrir O Padeiro" for clicado.
		PAD_ui.templates.onClick = function () {

			// Verifica se há acesso à internet.
			if (!netAccess()) {
				// Se não houver acesso, exibe um alerta informando que a funcionalidade será limitada e encerra a função.
				alert(lol + '#PAD_003 - sem acesso a rede...');
				return;
			}

			// Se houver acesso à internet, chama a função padeiroTemplateDialog() para exibir a interface de templates.
			padeiroTemplateDialog();
		};

		// Adiciona um ouvinte de evento de clique ao botão "Abrir O Padeiro". 
		PAD_ui.templates.addEventListener('click', function (c) {

			// Verifica se o botão clicado foi o botão direito do mouse (código 2).
			if (c.button == 2) {

				if (app.project.numItems == 0) return;

				var aItem = app.project.activeItem;

				if (aItem == null) return;

				PadMakerDialog();
			}
		});

		PAD_ui.fontes.onClick = function () { // Define a função a ser executada quando o botão "Instalar Fontes" for clicado.

			// Verifica se há acesso à rede.
			if (!netAccess()) {
				alert(lol + '#PAD_004 - sem acesso a rede...');
				return;
			}

			// Obtém o caminho da pasta do template a partir dos metadados XMP do projeto.
			var folderPath = getXMPData('source');
			var templateFontsPath = folderPath + '/FONTS';

			// Se o caminho da pasta não for encontrado, a função é interrompida.
			if (folderPath == '') {
				alert(lol + '#PAD_005 - esse não foi preenchido pelo padeiro...')
				return;
			}
			// Cria um objeto "Folder" para a pasta de fontes do template.
			var templateFontsFolder = new Folder(templateFontsPath);

			// Verifica se a pasta de fontes existe.
			if (!templateFontsFolder.exists) {
				alert(lol + '#PAD_006 - a pasta de fontes não foi localizada...')
				return;
			}
			// Se a pasta de fontes existe e o sistema operacional for Windows, instala as fontes.
			if (appOs == 'Win') installWinFonts(templateFontsPath);
		};

		// Adiciona um ouvinte de evento de clique ao botão "Instalar Fontes".
		PAD_ui.fontes.addEventListener('click', function (c) {

			// Verifica se o botão clicado foi o botão direito do mouse (código 2).
			if (c.button == 2) {

				// Verifica se há itens no projeto.
				if (app.project.numItems == 0) return;

				var savePath = Folder.selectDialog(); // Abre a janela de seleção de pastas

				if (savePath == null) return; // Se a janela foi cancelada, não faz nada

				var currentProjPath = decodeURI(savePath.fullName) + '/FONTS'; // caminho final do collect
				var fontsPath = fontCollect(currentProjPath);

				openFolder(fontsPath);
			}
		});

		// Define a função a ser executada quando o botão "Abrir Pasta de Saída" for clicado.
		PAD_ui.pastas.onClick = function () {

			// Verifica se há acesso à internet.
			if (!netAccess()) {
				alert(lol + '#PAD_007 - sem acesso a rede...');
				return; // Encerra a função se não houver acesso à internet.
			}

			// Verifica se há itens na fila de renderização.
			if (app.project.renderQueue.numItems < 1) {
				alert(lol + '#PAD_008 - a fila de render está vazia...')
				return;
			}
			// Obtém o último item da fila de renderização.
			var item = app.project.renderQueue.item(app.project.renderQueue.numItems);

			// Obtém o módulo de saída do item (onde o arquivo renderizado será salvo).
			var outputModule = item.outputModule(1);

			// Obtém o caminho completo da pasta de saída.
			var outputPath = decodeURI(outputModule.file.path);

			// Cria um objeto "Folder" para representar a pasta de saída.
			var fld = new Folder(outputPath);

			// Verifica se a pasta de saída existe.
			if (!fld.exists) {
				alert(lol + '#PAD_009 - a pasta não foi encontrada...'); // Exibe um erro se a pasta não for acessível.
				return; // Encerra a função se a pasta não existir.
			}

			// Abre a pasta de saída no sistema operacional do usuário.
			openFolder(outputPath);
		};

		// Adiciona um ouvinte de evento de clique ao botão "Abrir Pasta de Saída".
		PAD_ui.pastas.addEventListener('click', function (c) {
			// Verifica se o botão clicado foi o botão direito do mouse (código 2).
			if (c.button == 2) {

				// Verifica se há acesso à internet.
				if (!netAccess()) {
					alert(lol + '#PAD_007 - sem acesso a rede...');
					return; // Encerra a função se não houver acesso à internet.
				}
				var currentProj = app.project.file;

				if (currentProj == null) {
					alert(lol + '#PAD_010 - o projeto atual ainda não foi salvo...');
					return;
				}

				var currentProjPath = decodeURI(currentProj.path);
				var fld = new Folder(currentProjPath);

				if (!fld.exists) {
					alert(lol + '#PAD_011 - a pasta não foi encontrada...');
					return;
				}
				openFolder(decodeURI(fld.fullName));
			}
		});

		// Define a função a ser executada quando o botão "Renomear Comps" for clicado.
		PAD_ui.renomear.onClick = function () {

			// Verifica se há itens no projeto.
			if (app.project.numItems == 0) return; // Encerra a função se não houver itens.

			// Inicia um grupo de desfazer para que a operação de renomeação possa ser desfeita.
			app.beginUndoGroup('renomear comps');

			// Chama a função renamePromoComps para renomear as composições selecionadas.
			renamePromoComps(app.project.selection);

			// Finaliza o grupo de desfazer.
			app.endUndoGroup();
		};

		PAD_ui.renomear.addEventListener('click', function (c) {

			if (c.button == 2) {
				app.beginUndoGroup('renomear outputs');

				renameOutputs(); // renomeia todas as saídas

				app.endUndoGroup();
			}
		});

		PAD_ui.organizar.onClick = function () {

			// Verifica se há itens no projeto.
			if (app.project.numItems == 0) return; // Encerra a função se não houver itens.

			// grupo de desfazer
			app.beginUndoGroup('organização automática do projeto');

			// Se houver itens selecionados na janela projeto
			if (app.project.selection.length > 0) {

				// Itera sobre os itens selecionados
				for (var i = 0; i < app.project.selection.length; i++) {
					var aItem = app.project.selection[i]; // item selecionado

					// Se o item selecionado for uma composição sem tag
					if (aItem instanceof CompItem && aItem.comment === '') {
						aItem.comment = 'EXPORTAR'; // Adiciona a tag 'EXPORTAR' como comentário
					}
				}
			}

			deleteProjectFolders(); // Deleta as pastas existentes
			populateProjectFolders(); // Cria as pastas novas e organiza os itens
			deleteEmptyProjectFolders(); // Deleta as pastas vazias

			app.endUndoGroup();
		};

		PAD_ui.buscar.onClick = function () {

			findDialog();
		};

		PAD_ui.organizar.addEventListener('click', function (c) {

			// Verifica se o botão clicado foi o botão direito do mouse (código 2).
			if (c.button == 2) {

				app.beginUndoGroup('criar pastas do projeto');

				projectTemplateFolders(projectMode); // cria a estrutura de pastas do projeto

				app.endUndoGroup();
			}
		});

		PAD_ui.atalhos.onClick = function () {

			if (!netAccess()) {
				alert(lol + '#PAD_007 - sem acesso a rede...');
				return; // Encerra a função se não houver acesso à internet.
			}
			var apontamento = '"https://tvglobocorp.sharepoint.com/:x:/s/Planejamento-DTEN/Planejamento/EbkuFueT_DlFlUyRqlMSnJIBRpRsPPY72NSDqgKq0DvOKg?e=T7sn7i"';

			openWebSite(apontamento);
		};

		// Retorna o objeto da janela (PAD_w) para que ele possa ser exibido ou manipulado posteriormente.
		return PAD_w;
	}

	// Cria a janela da interface chamando a função O_PADEIRO_UI e passando o objeto atual como argumento. O resultado é armazenado na variável O_PADEIRO_WINDOW.
	var O_PADEIRO_WINDOW = O_PADEIRO_UI(thisObj);

	// Verifica se o After Effects tem acesso à internet.
	if (!netAccess()) {
		// Se não houver acesso, exibe um alerta pedindo para habilitar o acesso à rede nas preferências.
		alert('por favor, habilite a opção ' + netConfigName + ' nas preferencias');

		// Abre a janela de preferências do After Effects na seção de scripts.
		app.executeCommand(3131);

		// Verifica novamente se há acesso à rede.
		if (!netAccess()) {
			// Se ainda não houver acesso, exibe outro alerta informando que a funcionalidade será limitada.
			alert(lol + '#PAD_012 - sem acesso a rede...');
		}
	}

	// Verifica se a interface (O_PADEIRO_WINDOW) está sendo executada como uma janela flutuante.
	if (O_PADEIRO_WINDOW.toString() != '[object Panel]') {
		// Se for uma janela flutuante, exibe a janela.
		O_PADEIRO_WINDOW.show();
	}

	// Retorna o objeto da janela (O_PADEIRO_WINDOW).
	return O_PADEIRO_WINDOW;
}

// Executo tudo... ヽ(✿ﾟ▽ﾟ)ノ
O_PADEIRO_UTL(this);
