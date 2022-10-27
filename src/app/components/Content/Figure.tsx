import React, { ComponentPropsWithoutRef } from 'react';

/* Type for Molecules */
/** @see {@link Figure} */
type FigureContents = {
  Caption: typeof Caption;
  Image: typeof FigureImage;
  ImageMap: typeof ImageMap;
  Picture: typeof Picture;
  Video: typeof Video;
  Audio: typeof Audio;
  Svg: typeof Svg;
  Canvas: typeof Canvas;
};
type FigureProps = ComponentPropsWithoutRef<'figure'>;
type FigureCaptionProps = ComponentPropsWithoutRef<'figcaption'>;

type FigureImageProps = ComponentPropsWithoutRef<'img'>;
type ImageMapContents = {
  Area: typeof ImageArea;
};
type ImageMapProps = ComponentPropsWithoutRef<'map'>;
type ImageAreaProps = ComponentPropsWithoutRef<'area'>;

type PictureContents = {
  Source: typeof Source;
};
type PictureProps = ComponentPropsWithoutRef<'picture'>;

type MediaContents = {
  Source: typeof Source;
  Track: typeof Track;
};
type VideoProps = ComponentPropsWithoutRef<'video'>;
type AudioProps = ComponentPropsWithoutRef<'audio'>;

type SourceProps = ComponentPropsWithoutRef<'source'>;
type TrackProps = ComponentPropsWithoutRef<'track'>;

/** @see {@link Svg} */
type SVGContents = {
  Meta: {
    Title: typeof SvgTitle;
    Description: typeof SvgDescription;
    Language: typeof SvgLanguage;
    MetaData: typeof SvgMetaData;
    // Set: typeof SvgSet; // no tag type
  };
  Definition: typeof SvgDefinition;
  Group: typeof SvgGroup;
  Use: typeof SvgUse;
  Anchor: typeof SvgAnchor;
  // View: typeof SvgView; // safari no support
  // Symbol: typeof SvgSymbol; // has attributes No support
  Shape: {
    Rectangle: typeof SvgRectangle;
    Circle: typeof SvgCircle;
    Ellipse: typeof SvgEllipse;
  };
  MarkerShape: {
    Line: typeof SvgLine;
    PolyLine: typeof SvgPolyLine;
    Polygon: typeof SvgPolygon;
    Path: typeof SvgPath;
  };
  Marker: typeof SvgMarker;

  Text: typeof SvgText;
  Image: typeof SvgImage;
  Object: typeof SvgObject;

  Animation: typeof SvgAnimation;
  // Transform: typeof SvgAnimationTransform; // - safari no support
  // Motion: typeof SvgAnimationMotion; // - safari no support
  // Path: typeof SvgAnimationMotionPath; // - safari no support
};

type SvgDefinitionContents = {
  Gradient: {
    Linear: typeof SvgLinearGradient; // -> defs
    Radial: typeof SvgRadialGradient; // -> defs
    Stop: typeof SvgGradientStop; // -> Gradient
  };
  Mask: typeof SvgMask; // -> defs
  ClipPath: typeof SvgClipPath; // -> defs
  Pattern: typeof SvgPattern; // -> defs
};

type SvgTextContents = {
  Span: typeof SvgTextSpan; // -> Text
  Path: typeof SvgTextPath; // -> Text
};

type SvgProps = ComponentPropsWithoutRef<'svg'>;
type SvgTitleProps = ComponentPropsWithoutRef<'title'>;
type SvgDescriptionProps = ComponentPropsWithoutRef<'desc'>;
type SvgLanguageProps = ComponentPropsWithoutRef<'switch'>;
type SvgMetaDataProps = ComponentPropsWithoutRef<'metadata'>;

type SvgDefinitionProps = ComponentPropsWithoutRef<'defs'>;
type SvgMaskProps = ComponentPropsWithoutRef<'mask'>;
type SvgClipPathProps = ComponentPropsWithoutRef<'clipPath'>;
type SvgPatternProps = ComponentPropsWithoutRef<'pattern'>;
type SvgGroupProps = ComponentPropsWithoutRef<'g'>;
type SvgUseProps = ComponentPropsWithoutRef<'use'>;
type SvgAnchorProps = ComponentPropsWithoutRef<'a'>;

// type SvgViewProps = ComponentPropsWithoutRef<'view'>;
// type SvgSymbolProps = ComponentPropsWithoutRef<'symbol'>;

type SvgRectangleProps = ComponentPropsWithoutRef<'rect'>;
type SvgCircleProps = ComponentPropsWithoutRef<'circle'>;
type SvgEllipseProps = ComponentPropsWithoutRef<'ellipse'>;

type SvgLineProps = ComponentPropsWithoutRef<'line'>;
type SvgPolyLineProps = ComponentPropsWithoutRef<'polyline'>;
type SvgPolygonProps = ComponentPropsWithoutRef<'polygon'>;
type SvgPathProps = ComponentPropsWithoutRef<'path'>;
type SvgMarkerProps = ComponentPropsWithoutRef<'mark'>;

type SvgTextProps = ComponentPropsWithoutRef<'text'>;
type SvgTextSpanProps = ComponentPropsWithoutRef<'tspan'>;
type SvgTextPathProps = ComponentPropsWithoutRef<'textPath'>;

type SvgImageProps = ComponentPropsWithoutRef<'image'>;
type SvgObjectProps = ComponentPropsWithoutRef<'foreignObject'>;

type SvgLinearGradientProps = ComponentPropsWithoutRef<'linearGradient'>;
type SvgRadialGradientProps = ComponentPropsWithoutRef<'radialGradient'>;
type SvgGradientStopProps = ComponentPropsWithoutRef<'stop'>;

type SvgAnimationProps = ComponentPropsWithoutRef<'animate'>;
// type SvgAnimationTransformProps = ComponentPropsWithoutRef<'animateTransform'>;
// type SvgAnimationMotionProps = ComponentPropsWithoutRef<'animateMotion'>;
// type SvgAnimationMotionPathProps = ComponentPropsWithoutRef<'mpath'>;

// *canvas
type CanvasProps = ComponentPropsWithoutRef<'canvas'>;

/* List of Molecules */
/**
 * @see {@link FigureContents}
 * @example Figure
 * @example Figure.Caption
 * @example Figure.Image
 * @example Figure.ImageMap
 * @example Figure.Picture
 * @example Figure.Video
 * @example Figure.Audio
 * @example Figure.SVG
 * @example Figure.Canvas
 */
export const Figure: React.FC<FigureProps> & FigureContents = ({ children, ...rest }) => {
  return <figure {...rest}>{children}</figure>;
};
const Caption: React.FC<FigureCaptionProps> = ({ children, ...rest }) => {
  return <figcaption {...rest}>{children}</figcaption>;
};

const FigureImage: React.FC<FigureImageProps> = ({ alt, ...rest }) => {
  return <img {...rest} alt={alt} />;
};
const ImageMap: React.FC<ImageMapProps> & ImageMapContents = ({ children, ...rest }) => {
  return <map {...rest}>{children}</map>;
};
const ImageArea: React.FC<ImageAreaProps> = ({ alt, ...rest }) => {
  return <area {...rest} alt={alt} />;
};

const Canvas: React.FC<CanvasProps> = ({ children, ...rest }) => {
  return <canvas {...rest}>{children}</canvas>;
};

const Picture: React.FC<PictureProps> & PictureContents = ({ children, ...rest }) => {
  return <picture {...rest}>{children}</picture>;
};
const Video: React.FC<VideoProps> & MediaContents = ({ children, ...rest }) => {
  return <video {...rest}>{children}</video>;
};
const Audio: React.FC<AudioProps> & MediaContents = ({ children, ...rest }) => {
  return <audio {...rest}>{children}</audio>;
};
const Source: React.FC<SourceProps> = ({ ...rest }) => {
  return <source {...rest} />;
};
const Track: React.FC<TrackProps> = ({ ...rest }) => {
  return <track {...rest} />;
};

/**
 * @see {@link SVGContents}
 * @example Svg
 * @example Svg.Meta.Title
 * @example Svg.Meta.Description
 * @example Svg.Meta.Language
 * @example Svg.Meta.MetaData
 * @example Svg.Definition
 * @example Svg.Group
 * @example Svg.Use
 * @example Svg.Anchor
 * @example Svg.Shape.Rectangle
 * @example Svg.Shape.Circle
 * @example Svg.Shape.Ellipse
 * @example Svg.MarkerShape.Line
 * @example Svg.MarkerShape.PolyLine
 * @example Svg.MarkerShape.Polygon
 * @example Svg.MarkerShape.Path
 * @example Svg.Marker
 * @example Svg.Text
 * @example Svg.Image
 * @example Svg.Object
 * @example Svg.Animation
 */
const Svg: React.FC<SvgProps> & SVGContents = ({ children, ...rest }) => {
  return <svg {...rest}>{children}</svg>;
};
const SvgTitle: React.FC<SvgTitleProps> = ({ children, ...rest }) => {
  return <title {...rest}>{children}</title>;
};
const SvgDescription: React.FC<SvgDescriptionProps> = ({ children, ...rest }) => {
  return <desc {...rest}>{children}</desc>;
};
const SvgAnchor: React.FC<SvgAnchorProps> = ({ children, ...rest }) => {
  return <a {...rest}>{children}</a>;
};
const SvgLanguage: React.FC<SvgLanguageProps> = ({ children, ...rest }) => {
  return <switch {...rest}>{children}</switch>;
};
const SvgMetaData: React.FC<SvgMetaDataProps> = ({ children, ...rest }) => {
  return <metadata {...rest}>{children}</metadata>;
};

const SvgGroup: React.FC<SvgGroupProps> = ({ children, ...rest }) => {
  return <g {...rest}>{children}</g>;
};
const SvgDefinition: React.FC<SvgDefinitionProps> & SvgDefinitionContents = ({
  children,
  ...rest
}) => {
  return <defs {...rest}>{children}</defs>;
};
const SvgUse: React.FC<SvgUseProps> = ({ children, ...rest }) => {
  return <use {...rest}>{children}</use>;
};
// const SvgView: React.FC<SvgViewProps> = ({ children, ...rest }) => {
//   return <view {...rest}>{children}</view>;
// };
// const SvgSymbol: React.FC<SvgSymbolProps> = ({ children, ...rest }) => {
//   return <symbol {...rest}>{children}</symbol>;
// };
const SvgRectangle: React.FC<SvgRectangleProps> = ({ children, ...rest }) => {
  return <rect {...rest}>{children}</rect>;
};
const SvgCircle: React.FC<SvgCircleProps> = ({ children, ...rest }) => {
  return <circle {...rest}>{children}</circle>;
};
const SvgEllipse: React.FC<SvgEllipseProps> = ({ children, ...rest }) => {
  return <ellipse {...rest}>{children}</ellipse>;
};

const SvgMarker: React.FC<SvgMarkerProps> = ({ children, ...rest }) => {
  return <mark {...rest}>{children}</mark>;
};
const SvgLine: React.FC<SvgLineProps> = ({ children, ...rest }) => {
  return <line {...rest}>{children}</line>;
};
const SvgPolyLine: React.FC<SvgPolyLineProps> = ({ children, ...rest }) => {
  return <polyline {...rest}>{children}</polyline>;
};
const SvgPolygon: React.FC<SvgPolygonProps> = ({ children, ...rest }) => {
  return <polygon {...rest}>{children}</polygon>;
};
const SvgPath: React.FC<SvgPathProps> = ({ children, ...rest }) => {
  return <path {...rest}>{children}</path>;
};

const SvgText: React.FC<SvgTextProps> & SvgTextContents = ({ children, ...rest }) => {
  return <text {...rest}>{children}</text>;
};
const SvgTextSpan: React.FC<SvgTextSpanProps> = ({ children, ...rest }) => {
  return <tspan {...rest}>{children}</tspan>;
};
const SvgTextPath: React.FC<SvgTextPathProps> = ({ children, ...rest }) => {
  return <textPath {...rest}>{children}</textPath>;
};

const SvgImage: React.FC<SvgImageProps> = ({ children, ...rest }) => {
  return <image {...rest}>{children}</image>;
};
const SvgObject: React.FC<SvgObjectProps> = ({ children, ...rest }) => {
  return <foreignObject {...rest}>{children}</foreignObject>;
};

const SvgLinearGradient: React.FC<SvgLinearGradientProps> = ({ children, ...rest }) => {
  return <linearGradient {...rest}>{children}</linearGradient>;
};
const SvgRadialGradient: React.FC<SvgRadialGradientProps> = ({ children, ...rest }) => {
  return <radialGradient {...rest}>{children}</radialGradient>;
};
const SvgGradientStop: React.FC<SvgGradientStopProps> = ({ children, ...rest }) => {
  return <stop {...rest}>{children}</stop>;
};

const SvgMask: React.FC<SvgMaskProps> = ({ children, ...rest }) => {
  return <mask {...rest}>{children}</mask>;
};
const SvgClipPath: React.FC<SvgClipPathProps> = ({ children, ...rest }) => {
  return <clipPath {...rest}>{children}</clipPath>;
};
const SvgPattern: React.FC<SvgPatternProps> = ({ children, ...rest }) => {
  return <pattern {...rest}>{children}</pattern>;
};

const SvgAnimation: React.FC<SvgAnimationProps> = ({ children, ...rest }) => {
  return <animate {...rest}>{children}</animate>;
};
// const SvgAnimationTransform: React.FC<SvgAnimationTransformProps> = ({ children, ...rest }) => {
//   return <animateTransform {...rest}>{children}</animateTransform>;
// };
// const SvgAnimationMotion: React.FC<SvgAnimationMotionProps> = ({ children, ...rest }) => {
//   return <animateMotion {...rest}>{children}</animateMotion>;
// };
// const SvgAnimationMotionPath: React.FC<SvgAnimationMotionPathProps> = ({ children, ...rest }) => {
//   return <mpath {...rest}>{children}</mpath>;
// };

/* Setting for Molecules */
Figure.Caption = Caption;
Figure.Image = FigureImage;
Figure.ImageMap = ImageMap;
Figure.Svg = Svg;
Figure.Canvas = Canvas;
Figure.Picture = Picture;
Figure.Video = Video;
Figure.Audio = Audio;

ImageMap.Area = ImageArea;

Picture.Source = Source;
Video.Source = Source;
Audio.Source = Source;
Video.Track = Track;
Audio.Track = Track;

//* svg
Svg.Meta = {
  Title: SvgTitle,
  Description: SvgDescription,
  Language: SvgLanguage,
  MetaData: SvgMetaData
};

Svg.Definition = SvgDefinition;
SvgDefinition.Mask = SvgMask;
SvgDefinition.ClipPath = SvgClipPath;
SvgDefinition.Pattern = SvgPattern;
SvgDefinition.Gradient = {
  Linear: SvgLinearGradient,
  Radial: SvgRadialGradient,
  Stop: SvgGradientStop
};
Svg.Group = SvgGroup;
Svg.Use = SvgUse;
Svg.Anchor = SvgAnchor;

Svg.Shape = {
  Rectangle: SvgRectangle,
  Circle: SvgCircle,
  Ellipse: SvgEllipse
};
Svg.MarkerShape = {
  Line: SvgLine,
  PolyLine: SvgPolyLine,
  Polygon: SvgPolygon,
  Path: SvgPath
};
Svg.Marker = SvgMarker;

Svg.Text = SvgText;
SvgText.Path = SvgTextPath;
SvgText.Span = SvgTextSpan;

Svg.Image = SvgImage;
Svg.Object = SvgObject;
Svg.Animation = SvgAnimation;
