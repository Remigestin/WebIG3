--
-- PostgreSQL database dump
--

-- Dumped from database version 10.3 (Ubuntu 10.3-1.pgdg14.04+1)
-- Dumped by pg_dump version 10.3

-- Started on 2018-06-03 18:10:38

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 221 (class 1255 OID 2922673)
-- Name: func_date_inscription(); Type: FUNCTION; Schema: public; Owner: mwcdhrtfwxmpan
--

CREATE FUNCTION public.func_date_inscription() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF NEW.dateinscription IS NULL THEN
  	NEW.dateinscription = now();
  END IF;
  RETURN NEW;
END$$;


ALTER FUNCTION public.func_date_inscription() OWNER TO mwcdhrtfwxmpan;

--
-- TOC entry 225 (class 1255 OID 3556243)
-- Name: my_trigger_date_inscription(); Type: FUNCTION; Schema: public; Owner: mwcdhrtfwxmpan
--

CREATE FUNCTION public.my_trigger_date_inscription() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF NEW.dateinscription IS NULL THEN
  	NEW.dateinscription = now();
  END IF;
  RETURN NEW;
END$$;


ALTER FUNCTION public.my_trigger_date_inscription() OWNER TO mwcdhrtfwxmpan;

--
-- TOC entry 219 (class 1255 OID 4804637)
-- Name: my_trigger_date_order(); Type: FUNCTION; Schema: public; Owner: mwcdhrtfwxmpan
--

CREATE FUNCTION public.my_trigger_date_order() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF NEW.dateorder IS NULL THEN
  	NEW.dateorder = now();
  END IF;
  RETURN NEW;
END$$;


ALTER FUNCTION public.my_trigger_date_order() OWNER TO mwcdhrtfwxmpan;

--
-- TOC entry 222 (class 1255 OID 3167759)
-- Name: my_trigger_date_review(); Type: FUNCTION; Schema: public; Owner: mwcdhrtfwxmpan
--

CREATE FUNCTION public.my_trigger_date_review() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF NEW.datereview IS NULL THEN
  	NEW.datereview = now();
  END IF;
  RETURN NEW;
END$$;


ALTER FUNCTION public.my_trigger_date_review() OWNER TO mwcdhrtfwxmpan;

--
-- TOC entry 229 (class 1255 OID 4804862)
-- Name: my_trigger_empty_cart(); Type: FUNCTION; Schema: public; Owner: mwcdhrtfwxmpan
--

CREATE FUNCTION public.my_trigger_empty_cart() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  DELETE FROM linecart WHERE iduser = NEW.iduser;
  return null;
END;$$;


ALTER FUNCTION public.my_trigger_empty_cart() OWNER TO mwcdhrtfwxmpan;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 199 (class 1259 OID 3087631)
-- Name: album; Type: TABLE; Schema: public; Owner: mwcdhrtfwxmpan
--

CREATE TABLE public.album (
    idalbum integer NOT NULL,
    nomalbum character varying(32) NOT NULL,
    nomartiste character varying(32) NOT NULL,
    prixalbum integer NOT NULL,
    imagealbum character varying(200),
    descriptionalbum text,
    anneealbum integer,
    genrealbum character varying(32)
);


ALTER TABLE public.album OWNER TO mwcdhrtfwxmpan;

--
-- TOC entry 198 (class 1259 OID 3087629)
-- Name: album_idalbum_seq; Type: SEQUENCE; Schema: public; Owner: mwcdhrtfwxmpan
--

CREATE SEQUENCE public.album_idalbum_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.album_idalbum_seq OWNER TO mwcdhrtfwxmpan;

--
-- TOC entry 3788 (class 0 OID 0)
-- Dependencies: 198
-- Name: album_idalbum_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER SEQUENCE public.album_idalbum_seq OWNED BY public.album.idalbum;


--
-- TOC entry 204 (class 1259 OID 4712008)
-- Name: linecart; Type: TABLE; Schema: public; Owner: mwcdhrtfwxmpan
--

CREATE TABLE public.linecart (
    idlinecart integer NOT NULL,
    iduser integer NOT NULL,
    idalbum integer NOT NULL
);


ALTER TABLE public.linecart OWNER TO mwcdhrtfwxmpan;

--
-- TOC entry 207 (class 1259 OID 4712023)
-- Name: linecart_idalbum_seq; Type: SEQUENCE; Schema: public; Owner: mwcdhrtfwxmpan
--

CREATE SEQUENCE public.linecart_idalbum_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.linecart_idalbum_seq OWNER TO mwcdhrtfwxmpan;

--
-- TOC entry 3789 (class 0 OID 0)
-- Dependencies: 207
-- Name: linecart_idalbum_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER SEQUENCE public.linecart_idalbum_seq OWNED BY public.linecart.idalbum;


--
-- TOC entry 205 (class 1259 OID 4712011)
-- Name: linecart_idlinecart_seq; Type: SEQUENCE; Schema: public; Owner: mwcdhrtfwxmpan
--

CREATE SEQUENCE public.linecart_idlinecart_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.linecart_idlinecart_seq OWNER TO mwcdhrtfwxmpan;

--
-- TOC entry 3790 (class 0 OID 0)
-- Dependencies: 205
-- Name: linecart_idlinecart_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER SEQUENCE public.linecart_idlinecart_seq OWNED BY public.linecart.idlinecart;


--
-- TOC entry 206 (class 1259 OID 4712017)
-- Name: linecart_iduser_seq; Type: SEQUENCE; Schema: public; Owner: mwcdhrtfwxmpan
--

CREATE SEQUENCE public.linecart_iduser_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.linecart_iduser_seq OWNER TO mwcdhrtfwxmpan;

--
-- TOC entry 3791 (class 0 OID 0)
-- Dependencies: 206
-- Name: linecart_iduser_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER SEQUENCE public.linecart_iduser_seq OWNED BY public.linecart.iduser;


--
-- TOC entry 210 (class 1259 OID 4801792)
-- Name: order; Type: TABLE; Schema: public; Owner: mwcdhrtfwxmpan
--

CREATE TABLE public."order" (
    idorder integer NOT NULL,
    dateorder date NOT NULL,
    iduser integer NOT NULL
);


ALTER TABLE public."order" OWNER TO mwcdhrtfwxmpan;

--
-- TOC entry 208 (class 1259 OID 4801788)
-- Name: order_idorder_seq; Type: SEQUENCE; Schema: public; Owner: mwcdhrtfwxmpan
--

CREATE SEQUENCE public.order_idorder_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_idorder_seq OWNER TO mwcdhrtfwxmpan;

--
-- TOC entry 3792 (class 0 OID 0)
-- Dependencies: 208
-- Name: order_idorder_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER SEQUENCE public.order_idorder_seq OWNED BY public."order".idorder;


--
-- TOC entry 209 (class 1259 OID 4801790)
-- Name: order_iduser_seq; Type: SEQUENCE; Schema: public; Owner: mwcdhrtfwxmpan
--

CREATE SEQUENCE public.order_iduser_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_iduser_seq OWNER TO mwcdhrtfwxmpan;

--
-- TOC entry 3793 (class 0 OID 0)
-- Dependencies: 209
-- Name: order_iduser_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER SEQUENCE public.order_iduser_seq OWNED BY public."order".iduser;


--
-- TOC entry 214 (class 1259 OID 4803227)
-- Name: productorder; Type: TABLE; Schema: public; Owner: mwcdhrtfwxmpan
--

CREATE TABLE public.productorder (
    idproductorder integer NOT NULL,
    idalbum integer NOT NULL,
    idorder integer NOT NULL
);


ALTER TABLE public.productorder OWNER TO mwcdhrtfwxmpan;

--
-- TOC entry 212 (class 1259 OID 4803223)
-- Name: productorder_idalbum_seq; Type: SEQUENCE; Schema: public; Owner: mwcdhrtfwxmpan
--

CREATE SEQUENCE public.productorder_idalbum_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.productorder_idalbum_seq OWNER TO mwcdhrtfwxmpan;

--
-- TOC entry 3794 (class 0 OID 0)
-- Dependencies: 212
-- Name: productorder_idalbum_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER SEQUENCE public.productorder_idalbum_seq OWNED BY public.productorder.idalbum;


--
-- TOC entry 213 (class 1259 OID 4803225)
-- Name: productorder_idorder_seq; Type: SEQUENCE; Schema: public; Owner: mwcdhrtfwxmpan
--

CREATE SEQUENCE public.productorder_idorder_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.productorder_idorder_seq OWNER TO mwcdhrtfwxmpan;

--
-- TOC entry 3795 (class 0 OID 0)
-- Dependencies: 213
-- Name: productorder_idorder_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER SEQUENCE public.productorder_idorder_seq OWNED BY public.productorder.idorder;


--
-- TOC entry 211 (class 1259 OID 4803221)
-- Name: productorder_idproductorder_seq; Type: SEQUENCE; Schema: public; Owner: mwcdhrtfwxmpan
--

CREATE SEQUENCE public.productorder_idproductorder_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.productorder_idproductorder_seq OWNER TO mwcdhrtfwxmpan;

--
-- TOC entry 3796 (class 0 OID 0)
-- Dependencies: 211
-- Name: productorder_idproductorder_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER SEQUENCE public.productorder_idproductorder_seq OWNED BY public.productorder.idproductorder;


--
-- TOC entry 203 (class 1259 OID 3162515)
-- Name: review; Type: TABLE; Schema: public; Owner: mwcdhrtfwxmpan
--

CREATE TABLE public.review (
    idreview integer NOT NULL,
    commentaire text NOT NULL,
    note integer NOT NULL,
    datereview date NOT NULL,
    iduser integer NOT NULL,
    idalbum integer NOT NULL
);


ALTER TABLE public.review OWNER TO mwcdhrtfwxmpan;

--
-- TOC entry 202 (class 1259 OID 3162513)
-- Name: review_idalbum_seq; Type: SEQUENCE; Schema: public; Owner: mwcdhrtfwxmpan
--

CREATE SEQUENCE public.review_idalbum_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.review_idalbum_seq OWNER TO mwcdhrtfwxmpan;

--
-- TOC entry 3797 (class 0 OID 0)
-- Dependencies: 202
-- Name: review_idalbum_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER SEQUENCE public.review_idalbum_seq OWNED BY public.review.idalbum;


--
-- TOC entry 200 (class 1259 OID 3162509)
-- Name: review_idreview_seq; Type: SEQUENCE; Schema: public; Owner: mwcdhrtfwxmpan
--

CREATE SEQUENCE public.review_idreview_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.review_idreview_seq OWNER TO mwcdhrtfwxmpan;

--
-- TOC entry 3798 (class 0 OID 0)
-- Dependencies: 200
-- Name: review_idreview_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER SEQUENCE public.review_idreview_seq OWNED BY public.review.idreview;


--
-- TOC entry 201 (class 1259 OID 3162511)
-- Name: review_iduser_seq; Type: SEQUENCE; Schema: public; Owner: mwcdhrtfwxmpan
--

CREATE SEQUENCE public.review_iduser_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.review_iduser_seq OWNER TO mwcdhrtfwxmpan;

--
-- TOC entry 3799 (class 0 OID 0)
-- Dependencies: 201
-- Name: review_iduser_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER SEQUENCE public.review_iduser_seq OWNED BY public.review.iduser;


--
-- TOC entry 197 (class 1259 OID 2910357)
-- Name: user; Type: TABLE; Schema: public; Owner: mwcdhrtfwxmpan
--

CREATE TABLE public."user" (
    iduser integer NOT NULL,
    login character varying(100) NOT NULL,
    password character varying(100),
    email character varying(255),
    isadmin boolean,
    dateinscription date
);


ALTER TABLE public."user" OWNER TO mwcdhrtfwxmpan;

--
-- TOC entry 196 (class 1259 OID 2910355)
-- Name: user_iduser_seq; Type: SEQUENCE; Schema: public; Owner: mwcdhrtfwxmpan
--

CREATE SEQUENCE public.user_iduser_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_iduser_seq OWNER TO mwcdhrtfwxmpan;

--
-- TOC entry 3800 (class 0 OID 0)
-- Dependencies: 196
-- Name: user_iduser_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER SEQUENCE public.user_iduser_seq OWNED BY public."user".iduser;


--
-- TOC entry 3606 (class 2604 OID 3087634)
-- Name: album idalbum; Type: DEFAULT; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER TABLE ONLY public.album ALTER COLUMN idalbum SET DEFAULT nextval('public.album_idalbum_seq'::regclass);


--
-- TOC entry 3610 (class 2604 OID 4712013)
-- Name: linecart idlinecart; Type: DEFAULT; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER TABLE ONLY public.linecart ALTER COLUMN idlinecart SET DEFAULT nextval('public.linecart_idlinecart_seq'::regclass);


--
-- TOC entry 3611 (class 2604 OID 4712019)
-- Name: linecart iduser; Type: DEFAULT; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER TABLE ONLY public.linecart ALTER COLUMN iduser SET DEFAULT nextval('public.linecart_iduser_seq'::regclass);


--
-- TOC entry 3612 (class 2604 OID 4712025)
-- Name: linecart idalbum; Type: DEFAULT; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER TABLE ONLY public.linecart ALTER COLUMN idalbum SET DEFAULT nextval('public.linecart_idalbum_seq'::regclass);


--
-- TOC entry 3613 (class 2604 OID 4801795)
-- Name: order idorder; Type: DEFAULT; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER TABLE ONLY public."order" ALTER COLUMN idorder SET DEFAULT nextval('public.order_idorder_seq'::regclass);


--
-- TOC entry 3614 (class 2604 OID 4801796)
-- Name: order iduser; Type: DEFAULT; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER TABLE ONLY public."order" ALTER COLUMN iduser SET DEFAULT nextval('public.order_iduser_seq'::regclass);


--
-- TOC entry 3615 (class 2604 OID 4803230)
-- Name: productorder idproductorder; Type: DEFAULT; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER TABLE ONLY public.productorder ALTER COLUMN idproductorder SET DEFAULT nextval('public.productorder_idproductorder_seq'::regclass);


--
-- TOC entry 3616 (class 2604 OID 4803231)
-- Name: productorder idalbum; Type: DEFAULT; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER TABLE ONLY public.productorder ALTER COLUMN idalbum SET DEFAULT nextval('public.productorder_idalbum_seq'::regclass);


--
-- TOC entry 3617 (class 2604 OID 4803232)
-- Name: productorder idorder; Type: DEFAULT; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER TABLE ONLY public.productorder ALTER COLUMN idorder SET DEFAULT nextval('public.productorder_idorder_seq'::regclass);


--
-- TOC entry 3607 (class 2604 OID 3162518)
-- Name: review idreview; Type: DEFAULT; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER TABLE ONLY public.review ALTER COLUMN idreview SET DEFAULT nextval('public.review_idreview_seq'::regclass);


--
-- TOC entry 3608 (class 2604 OID 3162519)
-- Name: review iduser; Type: DEFAULT; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER TABLE ONLY public.review ALTER COLUMN iduser SET DEFAULT nextval('public.review_iduser_seq'::regclass);


--
-- TOC entry 3609 (class 2604 OID 3162520)
-- Name: review idalbum; Type: DEFAULT; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER TABLE ONLY public.review ALTER COLUMN idalbum SET DEFAULT nextval('public.review_idalbum_seq'::regclass);


--
-- TOC entry 3605 (class 2604 OID 2910360)
-- Name: user iduser; Type: DEFAULT; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER TABLE ONLY public."user" ALTER COLUMN iduser SET DEFAULT nextval('public.user_iduser_seq'::regclass);


--
-- TOC entry 3765 (class 0 OID 3087631)
-- Dependencies: 199
-- Data for Name: album; Type: TABLE DATA; Schema: public; Owner: mwcdhrtfwxmpan
--

INSERT INTO public.album (idalbum, nomalbum, nomartiste, prixalbum, imagealbum, descriptionalbum, anneealbum, genrealbum) VALUES (5, 'First Impressions Of Earth', 'The Strokes', 14, 'https://www.fuzz-bayonne.com/wp-content/uploads/2017/03/THE-STROKES-First-Impressions-Of-Earth.jpg', 'First Impressions Of Earth est le troisième album du groupe The Strokes, sorti en 2006. Il est parvenu à la première place des charts au Royaume-Uni et à la 4e aux États-Unis. Il est disque d&apos;or en France, au Royaume-Uni et en Australie.', 2006, 'Rock');
INSERT INTO public.album (idalbum, nomalbum, nomartiste, prixalbum, imagealbum, descriptionalbum, anneealbum, genrealbum) VALUES (14, 'Blackout', 'Scorpions', 15, 'https://lastfm-img2.akamaized.net/i/u/770x0/7ae6e40453913321b8badf504f192e16.jpg', 'Blackout est le huitième album studio du groupe de hard rock allemand Scorpions sorti en 1982 et qui les a réellement fait connaître au niveau international. Avec Blackout, le groupe sort celui qui est considéré comme son meilleur album hard rock.', 1982, 'Metal');
INSERT INTO public.album (idalbum, nomalbum, nomartiste, prixalbum, imagealbum, descriptionalbum, anneealbum, genrealbum) VALUES (15, 'The Dark Side of the Moon', 'Pink Floyd', 25, 'https://lastfm-img2.akamaized.net/i/u/770x0/fb824927b6a04e978553007ef6a7b9b8.jpg', 'The Dark Side of the Moon2 est le huitième album studio du groupe de rock progressif britannique Pink Floyd. Paru le 1er mars 1973 aux États-Unis et le 23 mars 1973 au Royaume-Uni, il est souvent considéré comme leur album le plus abouti. Il aborde des thèmes universels, comme le travail, l&apos;argent, la vieillesse, la guerre, la folie et la mort.', 1973, 'Rock');
INSERT INTO public.album (idalbum, nomalbum, nomartiste, prixalbum, imagealbum, descriptionalbum, anneealbum, genrealbum) VALUES (16, 'Starmania', 'Michel Berger', 18, 'https://static.fnac-static.com/multimedia/images_produits/ZoomPE/3/2/8/5051865339823/tsp20130903073354/Starmania-1988-Edition-30eme-anniversaire.jpg', 'Starmania est une comédie musicale de Michel Berger sur un livret de Luc Plamondon. Créée le 10 avril 1979 au Palais des Congrès de Paris, l&apos;œuvre est devenue, au fil des productions et des enregistrements, l&apos;un des spectacles les plus joués et les airs, parmi les plus célèbres du répertoire francophone.', 1978, 'Comédie Musicale');
INSERT INTO public.album (idalbum, nomalbum, nomartiste, prixalbum, imagealbum, descriptionalbum, anneealbum, genrealbum) VALUES (1, 'The Number of the Beast', 'Iron Maiden', 12, 'http://p5.storage.canalblog.com/56/92/636073/92966592_o.jpg', 'The Number of the Beast est le troisième album studio du groupe britannique de heavy metal Iron Maiden, et est sorti le 22 mars 1982. L''album est le premier du groupe avec le nouveau chanteur Bruce Dickinson qui remplaça le défaillant Paul Di''Anno, et le dernier avec le batteur Clive Burr, qui sera remplacé par le batteur Nicko McBrain.', 1982, 'Metal
');
INSERT INTO public.album (idalbum, nomalbum, nomartiste, prixalbum, imagealbum, descriptionalbum, anneealbum, genrealbum) VALUES (7, 'Back in Black', 'AC/DC', 22, 'http://www.granadatheater.com/wp-content/uploads/2018/05/24898849345160545.png', 'Back in Black, sorti le 25 juillet 1980, est le 7e album du groupe de hard rock AC/DC. Il s''agit du premier album du groupe enregistré avec le chanteur Brian Johnson, qui remplace Bon Scott, à qui l''album rend hommage', 1980, 'Rock/Metal');
INSERT INTO public.album (idalbum, nomalbum, nomartiste, prixalbum, imagealbum, descriptionalbum, anneealbum, genrealbum) VALUES (17, 'OK Computer', 'Radiohead', 25, 'https://images-na.ssl-images-amazon.com/images/I/81ni71zIxIL._SL1406_.jpg', 'OK Computer
Description de l&apos;image Radiohead, Ok Computer (Logo).png.
Album de Radiohead
Sortie	16 juin 1997
Enregistré	1996-1997
Durée	53:30
Genre	Rock alternatif
Art rock
Producteur	Nigel Godrich et Radiohead
Label	Parlophone
Critique	
AllMusic 5/5 étoiles1
Blender 5/5 étoiles2
Rolling Stone 4/5 étoiles3
Slant 5/5 étoiles4

Albums de Radiohead

The Bends
(1995)No Surprises/Running from Demons
(1997)

modifierConsultez la documentation du modèle

OK Computer est le troisième album du groupe de rock alternatif britannique Radiohead. Sorti le 16 juin 1997 au Royaume-Uni et le 1er juillet aux États-Unis, il a été enregistré dans un manoir à Bath, ainsi que dans l&apos;Oxfordshire.', 1997, 'Rock');
INSERT INTO public.album (idalbum, nomalbum, nomartiste, prixalbum, imagealbum, descriptionalbum, anneealbum, genrealbum) VALUES (18, 'Origin of Symmetry', 'Muse', 22, 'https://is2-ssl.mzstatic.com/image/thumb/Music7/v4/fb/16/db/fb16db8c-d2ca-804d-34cd-34bb63cf39ea/825646096909.jpg/600x600bf.jpg', 'Origin of Symmetry
Album de Muse
Sortie	17 juin 2001
Enregistré	Septembre 2000–février 2001
Ridge Farm Studio (Surrey)
Real World Studios (Wiltshire)
Studio Astoria (Londres)
Abbey Road Studios (Londres)
Sawmills Studio (Cornouailles)
St. Mary&apos;s Church (Bath)
Durée	51:41
Genre	Rock alternatif, rock progressif1, hard rock2, space rock3
Producteur	John Leckie, David Bottrill, Muse
Label	Mushroom Records
Albums de Muse

Showbiz
(1999)Hullabaloo
(2002)

Singles

Plug In Baby
Sortie : 5 mars 2001
New Born
Sortie : 5 juin 2001
Bliss
Sortie : 20 août 2001
Hyper Music/Feeling Good
Sortie : 19 novembre 2001
modifierConsultez la documentation du modèle

Origin of Symmetry est le deuxième album studio du groupe britannique Muse, sorti en 2001. Plug In Baby, New Born, Bliss, Feeling Good et Hyper Music sont les singles de cet album. Le dernier (Feeling Good/Hyper Music) est un double-A-side c’est-à-dire un double-single.', 2001, 'Rock');
INSERT INTO public.album (idalbum, nomalbum, nomartiste, prixalbum, imagealbum, descriptionalbum, anneealbum, genrealbum) VALUES (2, 'Night Visions', 'Imagine Dragons', 15, 'https://static.fnac-static.com/multimedia/FR/Images_Produits/FR/fnac.com/Visual_Principal_340/5/3/8/0602537126835/tsp20130128183040/Night-visions.jpg', 'Night Visions est le premier album studio du groupe de rock alternatif américain Imagine Dragons, sorti le 5 septembre 2012.', 2012, 'Rock alternatif !');


--
-- TOC entry 3770 (class 0 OID 4712008)
-- Dependencies: 204
-- Data for Name: linecart; Type: TABLE DATA; Schema: public; Owner: mwcdhrtfwxmpan
--

INSERT INTO public.linecart (idlinecart, iduser, idalbum) VALUES (4, 31, 1);
INSERT INTO public.linecart (idlinecart, iduser, idalbum) VALUES (11, 31, 2);


--
-- TOC entry 3776 (class 0 OID 4801792)
-- Dependencies: 210
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: mwcdhrtfwxmpan
--

INSERT INTO public."order" (idorder, dateorder, iduser) VALUES (4, '2018-06-01', 33);
INSERT INTO public."order" (idorder, dateorder, iduser) VALUES (5, '2018-06-01', 33);
INSERT INTO public."order" (idorder, dateorder, iduser) VALUES (6, '2018-06-01', 41);
INSERT INTO public."order" (idorder, dateorder, iduser) VALUES (7, '2018-06-02', 33);
INSERT INTO public."order" (idorder, dateorder, iduser) VALUES (8, '2018-06-02', 42);
INSERT INTO public."order" (idorder, dateorder, iduser) VALUES (9, '2018-06-03', 33);


--
-- TOC entry 3780 (class 0 OID 4803227)
-- Dependencies: 214
-- Data for Name: productorder; Type: TABLE DATA; Schema: public; Owner: mwcdhrtfwxmpan
--

INSERT INTO public.productorder (idproductorder, idalbum, idorder) VALUES (1, 5, 4);
INSERT INTO public.productorder (idproductorder, idalbum, idorder) VALUES (3, 5, 5);
INSERT INTO public.productorder (idproductorder, idalbum, idorder) VALUES (5, 5, 6);
INSERT INTO public.productorder (idproductorder, idalbum, idorder) VALUES (7, 2, 6);
INSERT INTO public.productorder (idproductorder, idalbum, idorder) VALUES (10, 1, 9);
INSERT INTO public.productorder (idproductorder, idalbum, idorder) VALUES (11, 5, 9);
INSERT INTO public.productorder (idproductorder, idalbum, idorder) VALUES (12, 7, 9);


--
-- TOC entry 3769 (class 0 OID 3162515)
-- Dependencies: 203
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: mwcdhrtfwxmpan
--

INSERT INTO public.review (idreview, commentaire, note, datereview, iduser, idalbum) VALUES (3, 'très bon album', 4, '2018-05-29', 31, 1);
INSERT INTO public.review (idreview, commentaire, note, datereview, iduser, idalbum) VALUES (13, 'Très funky !', 4, '2018-05-29', 41, 2);
INSERT INTO public.review (idreview, commentaire, note, datereview, iduser, idalbum) VALUES (14, 'Mon groupe préféré !', 5, '2018-05-29', 41, 7);
INSERT INTO public.review (idreview, commentaire, note, datereview, iduser, idalbum) VALUES (16, 'Bof, pas leur meilleur', 3, '2018-06-01', 31, 2);
INSERT INTO public.review (idreview, commentaire, note, datereview, iduser, idalbum) VALUES (18, 'The strokes mon groupé favoris !!', 3, '2018-06-01', 31, 5);
INSERT INTO public.review (idreview, commentaire, note, datereview, iduser, idalbum) VALUES (21, 'Un des meilleurs de Scorpions ! ', 4, '2018-06-03', 43, 14);
INSERT INTO public.review (idreview, commentaire, note, datereview, iduser, idalbum) VALUES (22, 'Ma comédie musicale préféré !', 5, '2018-06-03', 33, 16);
INSERT INTO public.review (idreview, commentaire, note, datereview, iduser, idalbum) VALUES (23, 'Muse est en train de régresser...', 2, '2018-06-03', 44, 18);


--
-- TOC entry 3763 (class 0 OID 2910357)
-- Dependencies: 197
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: mwcdhrtfwxmpan
--

INSERT INTO public."user" (iduser, login, password, email, isadmin, dateinscription) VALUES (27, 'Vorstag', '$2a$10$6BCjGvurZgblEthRGg1Zhu9RB2rh6KveN4vLTU3a8yCjOAy1KCtwq', 'gestin.remi@gmail.com', false, '2018-05-27');
INSERT INTO public."user" (iduser, login, password, email, isadmin, dateinscription) VALUES (28, 'Vorstag34', '$2a$10$l0sW/dw7Y1PM/fvLMIAsOOYtVrONU5Oy0x0zYBfsgObwETQ7E5GsO', 'sdfsdf', false, '2018-05-27');
INSERT INTO public."user" (iduser, login, password, email, isadmin, dateinscription) VALUES (29, 'Vorstag345', '$2a$10$3JxwYvLTG/goyl13JNAxh.iMKHEI0iNEh5ea0.u6RvOsjo0ZqcglW', 'gestin.remi@gmail.com', false, '2018-05-27');
INSERT INTO public."user" (iduser, login, password, email, isadmin, dateinscription) VALUES (32, 'Test', '$2a$10$soUID8RzGV8IkiCtxkEL5OSizJE20.9n1kZovb1MtKY9fmqSJXtve', 't@t.com', false, '2018-05-28');
INSERT INTO public."user" (iduser, login, password, email, isadmin, dateinscription) VALUES (31, 'Damien', '$2a$10$GlAlMO3z64x8sNuAff1aeuh4Q3NjbUk9gwelk3RP1rH9mnEq/Q50O', 't@t.com', true, '2018-05-28');
INSERT INTO public."user" (iduser, login, password, email, isadmin, dateinscription) VALUES (33, 'Alexis', '$2a$10$5uBBAflCB3D7k9uc24VpceNMGfKlnSqRVZIgxHhrA9skwTSinkNga', 'al@al.com', true, '2018-05-28');
INSERT INTO public."user" (iduser, login, password, email, isadmin, dateinscription) VALUES (41, 'Lucas', '$2a$10$kwKX0WJF69zRRDmDVe1f1efV1Y/7AUixMjQwDQZoBjXCQNwGltmWG', 'lucas@sardois.com', false, '2018-05-29');
INSERT INTO public."user" (iduser, login, password, email, isadmin, dateinscription) VALUES (42, 'Marine', '$2a$10$8JnlrhWPUxhkCg4lX7XohuFuAHmcfKfPxd9MN.pn5ZuIkJi7C7P.2', 'test@test.com', false, '2018-06-02');
INSERT INTO public."user" (iduser, login, password, email, isadmin, dateinscription) VALUES (43, 'Admin', '$2a$10$B0sCA.FY6jcTUev5BvJc5uvo311UyMqlGtKF8yREo2lq12z0Z/OrC', 'admin@admin.com', true, '2018-06-03');
INSERT INTO public."user" (iduser, login, password, email, isadmin, dateinscription) VALUES (44, 'User', '$2a$10$2DsqZMM2JDwXxf.R1W6CY.pKGS.Hebpo28G10J6wSJ/sAT8m09S7K', 'user@user.com', false, '2018-06-03');


--
-- TOC entry 3801 (class 0 OID 0)
-- Dependencies: 198
-- Name: album_idalbum_seq; Type: SEQUENCE SET; Schema: public; Owner: mwcdhrtfwxmpan
--

SELECT pg_catalog.setval('public.album_idalbum_seq', 18, true);


--
-- TOC entry 3802 (class 0 OID 0)
-- Dependencies: 207
-- Name: linecart_idalbum_seq; Type: SEQUENCE SET; Schema: public; Owner: mwcdhrtfwxmpan
--

SELECT pg_catalog.setval('public.linecart_idalbum_seq', 1, false);


--
-- TOC entry 3803 (class 0 OID 0)
-- Dependencies: 205
-- Name: linecart_idlinecart_seq; Type: SEQUENCE SET; Schema: public; Owner: mwcdhrtfwxmpan
--

SELECT pg_catalog.setval('public.linecart_idlinecart_seq', 24, true);


--
-- TOC entry 3804 (class 0 OID 0)
-- Dependencies: 206
-- Name: linecart_iduser_seq; Type: SEQUENCE SET; Schema: public; Owner: mwcdhrtfwxmpan
--

SELECT pg_catalog.setval('public.linecart_iduser_seq', 1, false);


--
-- TOC entry 3805 (class 0 OID 0)
-- Dependencies: 208
-- Name: order_idorder_seq; Type: SEQUENCE SET; Schema: public; Owner: mwcdhrtfwxmpan
--

SELECT pg_catalog.setval('public.order_idorder_seq', 9, true);


--
-- TOC entry 3806 (class 0 OID 0)
-- Dependencies: 209
-- Name: order_iduser_seq; Type: SEQUENCE SET; Schema: public; Owner: mwcdhrtfwxmpan
--

SELECT pg_catalog.setval('public.order_iduser_seq', 1, false);


--
-- TOC entry 3807 (class 0 OID 0)
-- Dependencies: 212
-- Name: productorder_idalbum_seq; Type: SEQUENCE SET; Schema: public; Owner: mwcdhrtfwxmpan
--

SELECT pg_catalog.setval('public.productorder_idalbum_seq', 1, false);


--
-- TOC entry 3808 (class 0 OID 0)
-- Dependencies: 213
-- Name: productorder_idorder_seq; Type: SEQUENCE SET; Schema: public; Owner: mwcdhrtfwxmpan
--

SELECT pg_catalog.setval('public.productorder_idorder_seq', 1, false);


--
-- TOC entry 3809 (class 0 OID 0)
-- Dependencies: 211
-- Name: productorder_idproductorder_seq; Type: SEQUENCE SET; Schema: public; Owner: mwcdhrtfwxmpan
--

SELECT pg_catalog.setval('public.productorder_idproductorder_seq', 12, true);


--
-- TOC entry 3810 (class 0 OID 0)
-- Dependencies: 202
-- Name: review_idalbum_seq; Type: SEQUENCE SET; Schema: public; Owner: mwcdhrtfwxmpan
--

SELECT pg_catalog.setval('public.review_idalbum_seq', 1, false);


--
-- TOC entry 3811 (class 0 OID 0)
-- Dependencies: 200
-- Name: review_idreview_seq; Type: SEQUENCE SET; Schema: public; Owner: mwcdhrtfwxmpan
--

SELECT pg_catalog.setval('public.review_idreview_seq', 23, true);


--
-- TOC entry 3812 (class 0 OID 0)
-- Dependencies: 201
-- Name: review_iduser_seq; Type: SEQUENCE SET; Schema: public; Owner: mwcdhrtfwxmpan
--

SELECT pg_catalog.setval('public.review_iduser_seq', 1, false);


--
-- TOC entry 3813 (class 0 OID 0)
-- Dependencies: 196
-- Name: user_iduser_seq; Type: SEQUENCE SET; Schema: public; Owner: mwcdhrtfwxmpan
--

SELECT pg_catalog.setval('public.user_iduser_seq', 44, true);


--
-- TOC entry 3621 (class 2606 OID 3087639)
-- Name: album album_pkey; Type: CONSTRAINT; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER TABLE ONLY public.album
    ADD CONSTRAINT album_pkey PRIMARY KEY (idalbum);


--
-- TOC entry 3625 (class 2606 OID 4712030)
-- Name: linecart linecart_pkey; Type: CONSTRAINT; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER TABLE ONLY public.linecart
    ADD CONSTRAINT linecart_pkey PRIMARY KEY (idlinecart);


--
-- TOC entry 3627 (class 2606 OID 4801798)
-- Name: order order_pkey; Type: CONSTRAINT; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_pkey PRIMARY KEY (idorder);


--
-- TOC entry 3629 (class 2606 OID 4803234)
-- Name: productorder productorder_pkey; Type: CONSTRAINT; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER TABLE ONLY public.productorder
    ADD CONSTRAINT productorder_pkey PRIMARY KEY (idproductorder);


--
-- TOC entry 3623 (class 2606 OID 3162525)
-- Name: review review_pkey; Type: CONSTRAINT; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_pkey PRIMARY KEY (idreview);


--
-- TOC entry 3619 (class 2606 OID 2910362)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (iduser);


--
-- TOC entry 3637 (class 2620 OID 3645896)
-- Name: user date_inscription_trigger; Type: TRIGGER; Schema: public; Owner: mwcdhrtfwxmpan
--

CREATE TRIGGER date_inscription_trigger BEFORE INSERT ON public."user" FOR EACH ROW EXECUTE PROCEDURE public.my_trigger_date_inscription();


--
-- TOC entry 3639 (class 2620 OID 4804638)
-- Name: order date_order_trigger; Type: TRIGGER; Schema: public; Owner: mwcdhrtfwxmpan
--

CREATE TRIGGER date_order_trigger BEFORE INSERT ON public."order" FOR EACH ROW EXECUTE PROCEDURE public.my_trigger_date_order();


--
-- TOC entry 3638 (class 2620 OID 3168579)
-- Name: review date_review_trigger; Type: TRIGGER; Schema: public; Owner: mwcdhrtfwxmpan
--

CREATE TRIGGER date_review_trigger BEFORE INSERT ON public.review FOR EACH ROW EXECUTE PROCEDURE public.my_trigger_date_review();


--
-- TOC entry 3640 (class 2620 OID 4804863)
-- Name: order empty_cart_trigger; Type: TRIGGER; Schema: public; Owner: mwcdhrtfwxmpan
--

CREATE TRIGGER empty_cart_trigger AFTER INSERT ON public."order" FOR EACH ROW EXECUTE PROCEDURE public.my_trigger_empty_cart();


--
-- TOC entry 3633 (class 2606 OID 4712042)
-- Name: linecart fk_idalbum_linecart; Type: FK CONSTRAINT; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER TABLE ONLY public.linecart
    ADD CONSTRAINT fk_idalbum_linecart FOREIGN KEY (idalbum) REFERENCES public.album(idalbum) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3636 (class 2606 OID 4803440)
-- Name: productorder fk_idalbum_productorder; Type: FK CONSTRAINT; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER TABLE ONLY public.productorder
    ADD CONSTRAINT fk_idalbum_productorder FOREIGN KEY (idalbum) REFERENCES public.album(idalbum) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3631 (class 2606 OID 3162940)
-- Name: review fk_idalbum_review; Type: FK CONSTRAINT; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT fk_idalbum_review FOREIGN KEY (idalbum) REFERENCES public.album(idalbum) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3635 (class 2606 OID 4803435)
-- Name: productorder fk_idorder_productorder; Type: FK CONSTRAINT; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER TABLE ONLY public.productorder
    ADD CONSTRAINT fk_idorder_productorder FOREIGN KEY (idorder) REFERENCES public."order"(idorder) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3632 (class 2606 OID 4712037)
-- Name: linecart fk_iduser_linecart; Type: FK CONSTRAINT; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER TABLE ONLY public.linecart
    ADD CONSTRAINT fk_iduser_linecart FOREIGN KEY (iduser) REFERENCES public."user"(iduser) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3634 (class 2606 OID 4803428)
-- Name: order fk_iduser_order; Type: FK CONSTRAINT; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT fk_iduser_order FOREIGN KEY (iduser) REFERENCES public."user"(iduser) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3630 (class 2606 OID 3162901)
-- Name: review fk_iduser_review; Type: FK CONSTRAINT; Schema: public; Owner: mwcdhrtfwxmpan
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT fk_iduser_review FOREIGN KEY (iduser) REFERENCES public."user"(iduser);


--
-- TOC entry 3787 (class 0 OID 0)
-- Dependencies: 7
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: mwcdhrtfwxmpan
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO mwcdhrtfwxmpan;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2018-06-03 18:10:49

--
-- PostgreSQL database dump complete
--

