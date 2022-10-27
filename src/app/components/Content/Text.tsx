import React, { ComponentPropsWithoutRef } from 'react';
import * as URI from 'uri-js';
import { URIOptions } from 'uri-js';

/* Type for Molecules */
// 콘텐츠(1): 제목

/** @see {@link Subject} */
type SubjectContents = {
  H1: typeof H1;
  H2: typeof H2;
  H3: typeof H3;
  H4: typeof H4;
  H5: typeof H5;
  H6: typeof H6;
};
type SubjectProps = ComponentPropsWithoutRef<'div'>; // 제목
type H1Props = ComponentPropsWithoutRef<'h1'>;
type H2Props = ComponentPropsWithoutRef<'h2'>;
type H3Props = ComponentPropsWithoutRef<'h3'>;
type H4Props = ComponentPropsWithoutRef<'h4'>;
type H5Props = ComponentPropsWithoutRef<'h5'>;
type H6Props = ComponentPropsWithoutRef<'h6'>;

// 콘텐츠(2): 문단, 문구
/** @see {@link Paragraph} */
type ParagraphContents = { Span: typeof Span };
type ParagraphProps = ComponentPropsWithoutRef<'p'>; // 문단
type SpanProps = ComponentPropsWithoutRef<'span'>; // 문구

// 콘텐츠(3): 상세정보
/** @see {@link Details} */
type DetailsContents = { Summary: typeof Summary };
type DetailsProps = ComponentPropsWithoutRef<'details'>; // 요약정보(타이틀) + 상세정보
type SummaryProps = ComponentPropsWithoutRef<'summary'>; // 요약정보(없을 때 agent-defined default string)

// 콘텐츠(4): 루비주석
/** @see {@link Ruby} */
type RubyContents = { Text: typeof RubyText; Parenthesis: typeof RubyParenthesis };
type RubyProps = ComponentPropsWithoutRef<'ruby'>; // 훈음(하단 - 원본)
type RubyTextProps = ComponentPropsWithoutRef<'rt'>; // 독음(상단 - 발음, 번역 등)
type RubyParenthesisProps = ComponentPropsWithoutRef<'rp'>; // (옆 - 발음, 번역 등)

// 콘텐츠(5): 코드
/** @see {@link CodeParser} */
type CodeParserContents = { Code: typeof CodeResult; Result: typeof CodeResult };
type CodeProps = ComponentPropsWithoutRef<'code'>; // 코드[light]
type CodeResultProps = ComponentPropsWithoutRef<'samp'>; // 코드 결과[border]
type CodeParserProps = ComponentPropsWithoutRef<'pre'>; // 사용자 입력 그대로 표기[모노스페이스]

// 콘텐츠(6): 줄바꿈(paragraph, word, text)
/** @see {@link LineBreak} */
type LineBreakContents = {
  Phrase: typeof PhraseBreak;
  Word: typeof WordBreak;
  Letter: typeof LetterBreak;
};
type LineBreakProps = ComponentPropsWithoutRef<'br'>;
type PhraseBreakProps = ComponentPropsWithoutRef<'hr'>;
type WordBreakProps = ComponentPropsWithoutRef<'wbr'>;
type LetterBreakProps = ComponentPropsWithoutRef<'br'>;

// 텍스트(1): 링크
/** @see {@link Anchor} */
type AnchorContents = { URI: (param?: URIOptions) => string };
type AnchorProps = ComponentPropsWithoutRef<'a'>; // [링크]

// 텍스트(2): 인용
/** @see {@link Quote} */
type QuoteContents = {
  Block: typeof BlockQuote;
  Inline: typeof InlineQuote;
};
type QuoteProps = ComponentPropsWithoutRef<'q'>;
type BlockQuoteProps = ComponentPropsWithoutRef<'q'>; // [기울기체]
type InlineQuoteProps = ComponentPropsWithoutRef<'blockquote'>; // [회색박스]
type CiteProps = ComponentPropsWithoutRef<'cite'>; // 출처[기울기체]

// 텍스트(3): 용어정의
/** @see {@link Definition} */
type DefinitionContents = { Anchor: typeof Anchor; Abbreviation: typeof Abbreviation };
type DefinitionProps = ComponentPropsWithoutRef<'dfn'>; // [기울기체]
type AbbreviationProps = ComponentPropsWithoutRef<'abbr'>; // 약어[light]

// 텍스트(4): 추가, 삭제
/** @see {@link EditText} */
type EditTextContents = {
  Insert: typeof InsertText;
  Delete: typeof DeleteText;
};
type EditTextProps = ComponentPropsWithoutRef<'ins'>;
type InsertTextProps = ComponentPropsWithoutRef<'ins'>; // [밑줄]
type DeleteTextProps = ComponentPropsWithoutRef<'del'>; // [취소서]

// 텍스트(5): 강조(의미, 발음)
/** @see {@link Emphasis} */
type EmphasisContents = {
  Semantic: typeof SemanticEmphasis;
  Pronounce: typeof PronounceEmphasis;
};
type EmphasisProps = ComponentPropsWithoutRef<'i'>;
type SemanticEmphasisProps = ComponentPropsWithoutRef<'i'>; // [기울기체]
type PronounceEmphasisProps = ComponentPropsWithoutRef<'em'>; // [기울기체]

// 텍스트(6): 시스템 관련(변수명, 키보드)
/** @see {@link SystemText} */
type SystemTextContents = {
  Variable: typeof Variable;
  Shortcut: typeof Shortcut;
};
type SystemTextProps = ComponentPropsWithoutRef<'span'>;
type VariableProps = ComponentPropsWithoutRef<'var'>; // 변수[기울기체]
type ShortcutProps = ComponentPropsWithoutRef<'kbd'>; // 단축키[모노스페이스]

// 텍스트(7): 스타일
/** @see {@link StyledText} */
type StyledTextContents = {
  Direction: typeof DirectionText;
  Underline: typeof UnderlineText;
  Mark: typeof MarkText;
  Strong: typeof StrongText;
  Strike: typeof StrikeText;
  Sup: typeof SupText;
  Sub: typeof SubText;
};
type StyledTextProps = ComponentPropsWithoutRef<'span'>;
type DirectionTextProps = ComponentPropsWithoutRef<'bdo'>; // [텍스트방향]
type UnderlineTextProps = ComponentPropsWithoutRef<'u'>; // [밑줄]
type MarkTextProps = ComponentPropsWithoutRef<'mark'>; // [형광펜]
type StrongTextProps = ComponentPropsWithoutRef<'strong'>; // [bold]
type StrikeTextProps = ComponentPropsWithoutRef<'s'>; // [취소선]
type SupTextProps = ComponentPropsWithoutRef<'sup'>; // [윗첨자]
type SubTextProps = ComponentPropsWithoutRef<'sub'>; // [아랫첨자]

// 기타: Machine-Readable
/** @see {@link Machine} */
type MachineContents = {
  Data: typeof MachineData;
  Time: typeof MachineTime;
};
type MachineProps = ComponentPropsWithoutRef<'data'>;
type MachineDataProps = ComponentPropsWithoutRef<'data'>;
type MachineTimeProps = ComponentPropsWithoutRef<'time'>;

/* List of Molecules */
/**
 * Subject level has up to 6
 * @see {@link SubjectContents}
 * @sample Subject -> div tag, need to customize
 * @sample Subject.H1
 * @sample Subject.H2
 * @sample Subject.H3
 * @sample Subject.H4
 * @sample Subject.H5
 * @sample Subject.H6
 */
export const Subject: React.FC<SubjectProps> & SubjectContents = ({ children, ...rest }) => {
  return <div {...rest}>{children}</div>;
};
const H1: React.FC<H1Props> = ({ children, ...rest }) => {
  return <h1 {...rest}>{children}</h1>;
};
const H2: React.FC<H2Props> = ({ children, ...rest }) => {
  return <h2 {...rest}>{children}</h2>;
};
const H3: React.FC<H3Props> = ({ children, ...rest }) => {
  return <h3 {...rest}>{children}</h3>;
};
const H4: React.FC<H4Props> = ({ children, ...rest }) => {
  return <h4 {...rest}>{children}</h4>;
};
const H5: React.FC<H5Props> = ({ children, ...rest }) => {
  return <h5 {...rest}>{children}</h5>;
};
const H6: React.FC<H6Props> = ({ children, ...rest }) => {
  return <h6 {...rest}>{children}</h6>;
};

/**
 * Paragraph has any structural grouping of related content
 * @see {@link ParagraphContents}
 * @example Paragraph
 * @example Paragraph.span
 */
export const Paragraph: React.FC<ParagraphProps> & ParagraphContents = ({ children, ...rest }) => {
  return <p {...rest}>{children}</p>;
};
const Span: React.FC<SpanProps> = ({ children, ...rest }) => {
  return <span {...rest}>{children}</span>;
};

/**
 * Details is disclosure widget, has summary
 * @see {@link DetailsContents}
 * @example Details
 * @example Details.Summary
 */
export const Details: React.FC<DetailsProps> & DetailsContents = ({ children, ...rest }) => {
  return <details {...rest}>{children}</details>;
};
const Summary: React.FC<SummaryProps> = ({ children, ...rest }) => {
  return <summary {...rest}>{children}</summary>;
};

/**
 * Ruby is comment, has text and parenthesis
 * @see {@link RubyContents}
 * @example Ruby
 * @example Ruby.Text
 * @example Ruby.Parenthesis
 */
export const Ruby: React.FC<RubyProps> & RubyContents = ({ children, ...rest }) => {
  return <ruby {...rest}>{children}</ruby>;
};
const RubyText: React.FC<RubyTextProps> = ({ children, ...rest }) => {
  return <rt {...rest}>{children}</rt>;
};
const RubyParenthesis: React.FC<RubyParenthesisProps> = ({ children, ...rest }) => {
  return <rp {...rest}>{children}</rp>;
};

/**
 * CodeParser is enable to text reserved word
 * @see {@link CodeParserContents}
 * @example CodeParser
 * @example CodeParser.Code
 * @example CodeParser.Result
 */
export const CodeParser: React.FC<CodeParserProps> & CodeParserContents = ({
  children,
  ...rest
}) => {
  return <pre {...rest}>{children}</pre>;
};
export const Code: React.FC<CodeProps> = ({ children, ...rest }) => {
  return <pre {...rest}>{children}</pre>;
};
export const CodeResult: React.FC<CodeResultProps> = ({ children, ...rest }) => {
  return <samp {...rest}>{children}</samp>;
};

/**
 * LineBreak deals with 3 situations
 * @see {@link LineBreakContents}
 * @example LineBreak -> br tag, it equals Letter
 * @example LineBreak.Phrase
 * @example LineBreak.Word
 * @example LineBreak.Letter
 */
export const LineBreak: React.FC<LineBreakProps> & LineBreakContents = ({ ...rest }) => {
  return <br {...rest} />;
};
export const PhraseBreak: React.FC<PhraseBreakProps> = ({ ...rest }) => {
  return <hr {...rest} />;
};
export const WordBreak: React.FC<WordBreakProps> = ({ ...rest }) => {
  return <wbr {...rest} />;
};
export const LetterBreak: React.FC<LetterBreakProps> = ({ ...rest }) => {
  return <br {...rest} />;
};

/**
 * Anchor has link like uri
 * @see {@link AnchorContents}
 * @example Anchor
 * @example Anchor.URI -> uri build helper
 */
export const Anchor: React.FC<AnchorProps> & AnchorContents = ({ children, ...rest }) => {
  return <a {...rest}>{children}</a>;
};

/**
 * Quote has 2 situations
 * @see {@link QuoteContents}
 * @example Quote -> q tag, it equals Inline
 * @example Quote.Inline
 * @example Quote.Block
 */
export const Quote: React.FC<QuoteProps> & QuoteContents = ({ children, ...rest }) => {
  return <q {...rest}>{children}</q>;
};
const InlineQuote: React.FC<InlineQuoteProps> = ({ children, ...rest }) => {
  return <q {...rest}>{children}</q>;
};
const BlockQuote: React.FC<BlockQuoteProps> = ({ children, ...rest }) => {
  return <blockquote {...rest}>{children}</blockquote>;
};
export const Cite: React.FC<CiteProps> = ({ children, ...rest }) => {
  return <cite {...rest}>{children}</cite>;
};

/**
 * Definition can do setting whether hashtag(#) link or indication
 * @see {@link DefinitionContents}
 * @example Definition
 * @example Definition.Anchor
 * @example Definition.Abbreviation
 */
export const Definition: React.FC<DefinitionProps> & DefinitionContents = ({
  children,
  ...rest
}) => {
  return <dfn {...rest}>{children}</dfn>;
};
export const Abbreviation: React.FC<AbbreviationProps> = ({ children, ...rest }) => {
  return <abbr {...rest}>{children}</abbr>;
};

/**
 * EditText has 2 situations
 * @see {@link EditTextContents}
 * @example EditText -> ins tag, it equals Insert
 * @example EditText.Insert
 * @example EditText.Delete
 */
export const EditText: React.FC<EditTextProps> & EditTextContents = ({ children, ...rest }) => {
  return <ins {...rest}>{children}</ins>;
};
const InsertText: React.FC<InsertTextProps> = ({ children, ...rest }) => {
  return <ins {...rest}>{children}</ins>;
};
const DeleteText: React.FC<DeleteTextProps> = ({ children, ...rest }) => {
  return <del {...rest}>{children}</del>;
};

/**
 * Emphasis has 2 situations
 * @see {@link EmphasisContents}
 * @example Emphasis -> i tag, it equals Semantic
 * @example Emphasis.Semantic
 * @example Emphasis.Pronounce
 */
export const Emphasis: React.FC<EmphasisProps> & EmphasisContents = ({ children, ...rest }) => {
  return <i {...rest}>{children}</i>;
};
export const SemanticEmphasis: React.FC<SemanticEmphasisProps> = ({ children, ...rest }) => {
  return <i {...rest}>{children}</i>;
};
export const PronounceEmphasis: React.FC<PronounceEmphasisProps> = ({ children, ...rest }) => {
  return <em {...rest}>{children}</em>;
};

/**
 * systemText has situations
 * @see {@link SystemTextContents}
 * @example SystemText -> span tag, need to customize
 * @example SystemText.Variable
 * @example SystemText.Shortcut
 */
export const SystemText: React.FC<SystemTextProps> & SystemTextContents = ({
  children,
  ...rest
}) => {
  return <span {...rest}>{children}</span>;
};
const Variable: React.FC<VariableProps> = ({ children, ...rest }) => {
  return <var {...rest}>{children}</var>;
};
const Shortcut: React.FC<ShortcutProps> = ({ children, ...rest }) => {
  return <kbd {...rest}>{children}</kbd>;
};

/**
 * StyledText has situations
 * @see {@link StyledTextContents}
 * @example StyledText -> span tag, need to customize
 * @example StyledText.Direction
 * @example StyledText.Underline
 * @example StyledText.Mark
 * @example StyledText.Strong
 * @example StyledText.Strike
 * @example StyledText.Sup
 * @example StyledText.Sub
 */
export const StyledText: React.FC<StyledTextProps> & StyledTextContents = ({
  children,
  ...rest
}) => {
  return <span {...rest}>{children}</span>;
};
const DirectionText: React.FC<DirectionTextProps> = ({ children, ...rest }) => {
  return <bdo {...rest}>{children}</bdo>;
};
const UnderlineText: React.FC<UnderlineTextProps> = ({ children, ...rest }) => {
  return <u {...rest}>{children}</u>;
};
const MarkText: React.FC<MarkTextProps> = ({ children, ...rest }) => {
  return <mark {...rest}>{children}</mark>;
};
const StrongText: React.FC<StrongTextProps> = ({ children, ...rest }) => {
  return <strong {...rest}>{children}</strong>;
};
const StrikeText: React.FC<StrikeTextProps> = ({ children, ...rest }) => {
  return <s {...rest}>{children}</s>;
};
const SupText: React.FC<SupTextProps> = ({ children, ...rest }) => {
  return <sup {...rest}>{children}</sup>;
};
const SubText: React.FC<SubTextProps> = ({ children, ...rest }) => {
  return <sub {...rest}>{children}</sub>;
};

/**
 * Machine has 2 situations
 * @see {@link MachineContents}
 * @example Machine -> data tag, it equals Data
 * @example Machine.Time
 * @example Machine.Data
 */
export const Machine: React.FC<MachineProps> & MachineContents = ({ children, ...rest }) => {
  return <data {...rest}>{children}</data>;
};
const MachineTime: React.FC<MachineTimeProps> = ({ children, ...rest }) => {
  return <time {...rest}>{children}</time>;
};
const MachineData: React.FC<MachineDataProps> = ({ children, ...rest }) => {
  return <data {...rest}>{children}</data>;
};

/* Setting for Molecules */
/**
 * @see {@link SubjectContents}
 * @see {@link Subject}
 */
Subject.H1 = H1;
Subject.H2 = H2;
Subject.H3 = H3;
Subject.H4 = H4;
Subject.H5 = H5;
Subject.H6 = H6;

/**
 * @see {@link ParagraphContents}
 * @see {@link Paragraph}
 */
Paragraph.Span = Span;

/**
 * @see {@link DetailsContents}
 * @see {@link Details}
 */
Details.Summary = Summary;

/**
 * @see {@link LineBreakContents}
 * @see {@link LineBreak}
 */
LineBreak.Phrase = PhraseBreak;
LineBreak.Word = WordBreak;
LineBreak.Letter = LetterBreak;

/**
 * @see {@link RubyContents}
 * @see {@link Ruby}
 */
Ruby.Text = RubyText;
Ruby.Parenthesis = RubyParenthesis;

/**
 * @see {@link CodeParserContents}
 * @see {@link CodeParser}
 */
CodeParser.Code = Code;
CodeParser.Result = CodeResult;

/**
 * @see {@link AnchorContents}
 * @see {@link Anchor}
 */
Anchor.URI = param => URI.serialize({ ...param });

/**
 * @see {@link QuoteContents}
 * @see {@link Quote}
 */
Quote.Block = BlockQuote;
Quote.Inline = InlineQuote;

/**
 * @see {@link DefinitionContents}
 * @see {@link Definition}
 */
Definition.Anchor = Anchor;
Definition.Abbreviation = Abbreviation;

/**
 * @see {@link EditTextContents}
 * @see {@link EditText}
 */
EditText.Insert = InsertText;
EditText.Delete = DeleteText;

/**
 * @see {@link EmphasisContents}
 * @see {@link Emphasis}
 */
Emphasis.Semantic = SemanticEmphasis;
Emphasis.Pronounce = PronounceEmphasis;

/**
 * @see {@link SystemTextContents}
 * @see {@link SystemText}
 */
SystemText.Variable = Variable;
SystemText.Shortcut = Shortcut;

/**
 * @see {@link StyledTextContents}
 * @see {@link StyledText}
 */
StyledText.Direction = DirectionText;
StyledText.Underline = UnderlineText;
StyledText.Mark = MarkText;
StyledText.Strike = StrikeText;
StyledText.Strong = StrongText;
StyledText.Sub = SubText;
StyledText.Sup = SupText;

/**
 * @see {@link MachineContents}
 * @see {@link Machine}
 */
Machine.Data = MachineData;
Machine.Time = MachineTime;
