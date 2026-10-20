import type { ComponentType } from "react";
import type { Section } from "@/lib/types";
import Article from "./Article";
import BannerFullScreen from "./BannerFullScreen";
import BulletPoints from "./BulletPoints";
import CardsInfo from "./CardsInfo";
import CaseStudies from "./CaseStudies";
import Characteristics from "./Characteristics";
import ContactCards from "./ContactCards";
import ContactForm from "./ContactForm";
import DataHighlights from "./DataHighlights";
import FeatureHighlights from "./FeatureHighlights";
import FullScreenMedia from "./FullScreenMedia";
import GradientDivider from "./GradientDivider";
import Hero from "./Hero";
import HeroDivision from "./HeroDivision";
import SecondaryHero from "./SecondaryHero";
import Highlight from "./Highlight";
import HighlightsCarousel from "./HighlightsCarousel";
import InsightsCarousel from "./InsightsCarousel";
import InsightsGrid from "./InsightsGrid";
import InteractiveMap from "./InteractiveMap";
import LinkList from "./LinkList";
import LogoHighlights from "./LogoHighlights";
import MediaText from "./MediaText";
import PageTitle from "./PageTitle";
import PeopleGrid from "./PeopleGrid";
import ProductHero from "./ProductHero";
import Products from "./Products";
import ProductsHighlight from "./ProductsHighlight";
import RichText from "./RichText";
import SolutionsGrid from "./SolutionsGrid";
import StepsCarousel from "./StepsCarousel";
import Testimonial from "./Testimonial";
import TextBanner from "./TextBanner";
import Timeline from "./Timeline";
import TwoColumnMedia from "./TwoColumnMedia";

/**
 * Cada layout del campo "Secciones" de WordPress se pinta con el componente del mismo nombre.
 * Para un módulo nuevo: crea el layout en wordpress/metalquimia-core/sections/<nombre>.php
 * y añade aquí su componente.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sections: Record<string, ComponentType<any>> = {
  article: Article,
  banner_full_screen: BannerFullScreen,
  bullet_points: BulletPoints,
  cards_info: CardsInfo,
  case_studies: CaseStudies,
  characteristics: Characteristics,
  contact_cards: ContactCards,
  contact_form: ContactForm,
  data_highlights: DataHighlights,
  feature_highlights: FeatureHighlights,
  full_screen_media: FullScreenMedia,
  gradient_divider: GradientDivider,
  hero: Hero,
  hero_division: HeroDivision,
  hero_secondary: SecondaryHero,
  highlight: Highlight,
  highlights_carousel: HighlightsCarousel,
  insights_carousel: InsightsCarousel,
  insights_grid: InsightsGrid,
  interactive_map: InteractiveMap,
  link_list: LinkList,
  logo_highlights: LogoHighlights,
  media_text: MediaText,
  page_title: PageTitle,
  people_grid: PeopleGrid,
  product_hero: ProductHero,
  products: Products,
  products_highlight: ProductsHighlight,
  rich_text: RichText,
  solutions_grid: SolutionsGrid,
  steps_carousel: StepsCarousel,
  testimonial: Testimonial,
  text_banner: TextBanner,
  timeline: Timeline,
  two_column_media: TwoColumnMedia,
};

/** Secciones con fondo oscuro a sangre sobre las que la cabecera puede ir superpuesta. */
export const overlayHeaderSections = new Set(["hero", "product_hero", "insights_grid"]);

export type SectionComponent = ComponentType<Section>;
