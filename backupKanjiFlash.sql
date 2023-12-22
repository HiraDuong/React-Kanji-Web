--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

-- Started on 2023-12-19 13:28:14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 225 (class 1255 OID 16549)
-- Name: delete_related_data(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE OR REPLACE FUNCTION public.delete_related_data() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Xóa dữ liệu từ bảng user_progress
    DELETE FROM public.user_progress WHERE course_id = OLD.course_id;

    -- Xóa dữ liệu từ bảng course_word_items
    DELETE FROM public.course_word_items WHERE course_id = OLD.course_id;
    -- Xóa dữ liệu từ bảng user_progress
    DELETE FROM public.user_progress WHERE course_id = OLD.course_id;

    RETURN OLD;
END;
$$;


ALTER FUNCTION public.delete_related_data() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16399)
-- Name: app_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.app_user (
    user_id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    name character varying(255),
    age integer DEFAULT 0,
    email character varying(255),
    role integer DEFAULT 1 NOT NULL,
    avt character varying(255) DEFAULT 'https://i.pinimg.com/236x/98/96/86/9896861906bb3ae3d515b48a8c3d1c7e.jpg'::character varying
);


ALTER TABLE public.app_user OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16398)
-- Name: app_user_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.app_user_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.app_user_user_id_seq OWNER TO postgres;

--
-- TOC entry 4915 (class 0 OID 0)
-- Dependencies: 215
-- Name: app_user_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.app_user_user_id_seq OWNED BY public.app_user.user_id;


--
-- TOC entry 220 (class 1259 OID 16437)
-- Name: courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.courses (
    course_id integer NOT NULL,
    course_name character varying(255) NOT NULL,
    description text,
    course_image character varying(255) DEFAULT 'https://hellopeaksacademy.newzenler.com/images/default-course-thumbnail.png'::character varying,
    create_by character varying(255) DEFAULT 'admin'::character varying,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_by_user_id integer DEFAULT 2 NOT NULL
);


ALTER TABLE public.courses OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16436)
-- Name: course_course_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.course_course_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.course_course_id_seq OWNER TO postgres;

--
-- TOC entry 4916 (class 0 OID 0)
-- Dependencies: 219
-- Name: course_course_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.course_course_id_seq OWNED BY public.courses.course_id;


--
-- TOC entry 221 (class 1259 OID 16445)
-- Name: course_word_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course_word_items (
    course_id integer NOT NULL,
    word_id integer NOT NULL,
    item_id integer NOT NULL
);


ALTER TABLE public.course_word_items OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16463)
-- Name: course_word_items_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.course_word_items_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.course_word_items_item_id_seq OWNER TO postgres;

--
-- TOC entry 4917 (class 0 OID 0)
-- Dependencies: 222
-- Name: course_word_items_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.course_word_items_item_id_seq OWNED BY public.course_word_items.item_id;


--
-- TOC entry 224 (class 1259 OID 16479)
-- Name: user_progress; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_progress (
    user_progress_id integer NOT NULL,
    user_id integer NOT NULL,
    course_id integer NOT NULL,
    word_id integer NOT NULL,
    remember integer NOT NULL
);


ALTER TABLE public.user_progress OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16478)
-- Name: user_progress_user_progress_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_progress_user_progress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_progress_user_progress_id_seq OWNER TO postgres;

--
-- TOC entry 4918 (class 0 OID 0)
-- Dependencies: 223
-- Name: user_progress_user_progress_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_progress_user_progress_id_seq OWNED BY public.user_progress.user_progress_id;


--
-- TOC entry 218 (class 1259 OID 16428)
-- Name: words; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.words (
    word_id integer NOT NULL,
    kanji character varying(255) NOT NULL,
    meaning character varying(255) NOT NULL,
    pronounce character varying(255),
    image character varying(255) DEFAULT 'https://cla.hust.edu.vn/xmedia/2015/01/cach-hoc-kanji-hieu-qua.jpg'::character varying,
    example character varying(255)
);


ALTER TABLE public.words OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16427)
-- Name: word_word_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.word_word_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.word_word_id_seq OWNER TO postgres;

--
-- TOC entry 4919 (class 0 OID 0)
-- Dependencies: 217
-- Name: word_word_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.word_word_id_seq OWNED BY public.words.word_id;


--
-- TOC entry 4709 (class 2604 OID 16402)
-- Name: app_user user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.app_user ALTER COLUMN user_id SET DEFAULT nextval('public.app_user_user_id_seq'::regclass);


--
-- TOC entry 4721 (class 2604 OID 16464)
-- Name: course_word_items item_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_word_items ALTER COLUMN item_id SET DEFAULT nextval('public.course_word_items_item_id_seq'::regclass);


--
-- TOC entry 4715 (class 2604 OID 16440)
-- Name: courses course_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses ALTER COLUMN course_id SET DEFAULT nextval('public.course_course_id_seq'::regclass);


--
-- TOC entry 4722 (class 2604 OID 16482)
-- Name: user_progress user_progress_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_progress ALTER COLUMN user_progress_id SET DEFAULT nextval('public.user_progress_user_progress_id_seq'::regclass);


--
-- TOC entry 4713 (class 2604 OID 16431)
-- Name: words word_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.words ALTER COLUMN word_id SET DEFAULT nextval('public.word_word_id_seq'::regclass);


--
-- TOC entry 4901 (class 0 OID 16399)
-- Dependencies: 216
-- Data for Name: app_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.app_user (user_id, username, password, name, age, email, role, avt) FROM stdin;
2	jane_smith	pass456	Jane Smith	30	jane@example.com	2	https://i.pinimg.com/236x/98/96/86/9896861906bb3ae3d515b48a8c3d1c7e.jpg
3	bob_jones	pass789	Bob Jones	22	bob@example.com	1	https://i.pinimg.com/236x/98/96/86/9896861906bb3ae3d515b48a8c3d1c7e.jpg
5	newUser	newPassword	New User	25	newuser@example.com	1	https://i.pinimg.com/236x/98/96/86/9896861906bb3ae3d515b48a8c3d1c7e.jpg
9	testuser	testpassword	Test User	25	testuser@example.com	1	https://i.pinimg.com/236x/98/96/86/9896861906bb3ae3d515b48a8c3d1c7e.jpg
10	hoang	123	hira	0	h@gmail.com	1	https://i.pinimg.com/236x/98/96/86/9896861906bb3ae3d515b48a8c3d1c7e.jpg
11	Duong	1234	duong	0	duong@gmail.com	1	https://i.pinimg.com/236x/98/96/86/9896861906bb3ae3d515b48a8c3d1c7e.jpg
27	Duong123	1234	New User 222	25	newuser3@example.com	1	https://i.pinimg.com/236x/98/96/86/9896861906bb3ae3d515b48a8c3d1c7e.jpg
28	hira	12345	Vũ Huy Hoàng	0	hira@gmail.com	1	https://i.pinimg.com/236x/98/96/86/9896861906bb3ae3d515b48a8c3d1c7e.jpg
1	john_doe	duongduong	John	25	duongmaiduong@gmail.com	1	https://i.ibb.co/LRGVLCg/8-1680496018.jpg
\.


--
-- TOC entry 4906 (class 0 OID 16445)
-- Dependencies: 221
-- Data for Name: course_word_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.course_word_items (course_id, word_id, item_id) FROM stdin;
5	1	1
5	2	2
5	3	3
5	4	4
5	5	5
5	6	6
5	7	7
5	8	8
5	9	9
5	10	10
5	11	11
5	12	12
5	13	13
5	14	14
5	15	15
5	0	16
4	16	17
4	17	18
4	18	19
4	19	20
4	20	21
4	21	22
4	22	23
4	23	24
4	24	25
4	25	26
3	26	27
3	27	28
3	28	29
3	29	30
3	30	31
3	31	32
3	32	33
3	33	34
3	34	35
3	35	36
2	3	344
2	6	345
2	7	346
2	8	347
2	9	348
2	11	349
2	12	350
2	36	351
2	37	352
2	38	353
1	46	47
1	47	48
1	48	49
1	49	50
1	50	51
1	51	52
1	52	53
1	53	54
1	54	55
1	55	56
1	56	57
6	1	58
6	2	59
6	3	60
6	4	61
6	5	62
6	6	63
6	7	64
6	8	65
6	9	66
6	10	67
6	11	68
6	12	69
6	13	70
6	14	71
6	15	72
6	16	73
6	17	74
6	18	75
6	19	76
6	20	77
6	21	78
6	22	79
6	23	80
6	24	81
6	25	82
6	26	83
6	27	84
6	28	85
6	29	86
6	30	87
6	31	88
6	32	89
6	33	90
6	34	91
6	35	92
6	36	93
6	37	94
6	38	95
6	39	96
6	40	97
6	41	98
6	42	99
6	43	100
6	44	101
6	45	102
6	46	103
6	47	104
6	48	105
6	49	106
6	50	107
6	51	108
6	52	109
6	53	110
6	54	111
6	55	112
6	56	113
11	0	117
11	1	118
11	2	119
11	4	120
11	5	121
12	0	122
12	3	123
12	5	124
12	6	125
12	7	126
12	9	127
12	10	128
12	15	129
12	25	130
12	42	131
2	39	354
2	40	355
2	41	356
2	42	357
2	43	358
2	44	359
2	45	360
35	4	259
35	16	260
35	17	261
35	18	262
35	19	263
35	20	264
35	21	265
35	22	266
35	23	267
35	24	268
35	25	269
35	26	270
19	0	271
19	1	272
19	2	273
19	3	274
19	4	275
19	5	276
19	6	277
19	7	278
\.


--
-- TOC entry 4905 (class 0 OID 16437)
-- Dependencies: 220
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.courses (course_id, course_name, description, course_image, create_by, "createdAt", "updatedAt", created_by_user_id) FROM stdin;
1	Kanji N1	Advanced level Kanji	https://i.redd.it/v88lpnp2gok61.png	admin	2023-12-16 21:07:26.208006	2023-12-16 21:07:26.213434	2
3	Kanji N3	Intermediate level Kanji	https://i.redd.it/v88lpnp2gok61.png	admin	2023-12-16 21:07:26.208006	2023-12-16 21:07:26.213434	2
4	Kanji N4	Lower intermediate level Kanji	https://i.redd.it/v88lpnp2gok61.png	admin	2023-12-16 21:07:26.208006	2023-12-16 21:07:26.213434	2
5	Kanji N5	Beginner level Kanji	https://i.redd.it/v88lpnp2gok61.png	admin	2023-12-16 21:07:26.208006	2023-12-16 21:07:26.213434	2
6	Total Course	All levels combined	https://i.redd.it/v88lpnp2gok61.png	admin	2023-12-16 21:07:26.208006	2023-12-16 21:07:26.213434	2
12	Kanji Minna	Minna no nihongo	https://hellopeaksacademy.newzenler.com/images/default-course-thumbnail.png	admin	2023-12-17 08:27:43.311	2023-12-17 08:27:43.311	2
11	Tổng ôn kanji	Tổng ôn 	https://hellopeaksacademy.newzenler.com/images/default-course-thumbnail.png	admin\n	2023-12-16 19:43:38.377	2023-12-16 19:43:38.377	2
35	Kanji siêu khó	Super kanji	https://i.ibb.co/6Bq2zXK/368085804-824714359438645-6064086891524748455-n.gif	John	2023-12-18 03:13:20.603	2023-12-18 03:13:20.603	1
19	Updated Course Name	Updated Course Description	https://i.ibb.co/YdXnzD3/unnamed.png	Vũ Huy Hoàng	2023-12-17 10:55:18.657	2023-12-18 13:19:24.029	28
2	Kanji N2	Kanji dành cho ai học n2	https://i.ibb.co/8zy9mKq/unnamed.png	admin	2023-12-16 21:07:26.208006	2023-12-18 13:32:46.233	2
\.


--
-- TOC entry 4909 (class 0 OID 16479)
-- Dependencies: 224
-- Data for Name: user_progress; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_progress (user_progress_id, user_id, course_id, word_id, remember) FROM stdin;
110	1	1	51	0
203	1	35	16	0
112	1	1	53	0
204	1	35	17	1
106	1	1	47	0
108	1	1	49	0
111	1	1	52	1
116	1	3	26	1
118	1	3	28	1
121	1	3	31	0
123	1	2	37	1
126	1	2	40	1
128	1	2	42	1
130	1	2	44	1
132	1	5	0	1
133	1	5	1	1
134	1	5	2	1
135	1	5	3	1
136	1	5	4	1
137	1	5	5	1
138	1	5	6	1
139	1	5	7	1
140	1	5	8	1
141	1	5	9	1
142	1	5	10	1
143	1	5	11	1
144	1	5	12	1
145	1	5	13	1
146	1	5	14	1
147	1	5	15	1
113	1	1	54	0
114	1	1	55	1
115	1	1	56	0
122	1	2	36	0
124	1	2	38	0
125	1	2	39	0
127	1	2	41	0
129	1	2	43	0
131	1	2	45	0
148	5	2	36	1
205	1	35	18	0
206	1	35	19	1
207	1	35	20	0
105	1	1	46	1
208	1	35	21	1
209	1	35	22	1
210	1	35	23	0
211	1	35	24	1
212	1	35	25	0
213	1	35	26	1
149	5	2	37	1
150	5	2	38	0
151	5	2	39	1
152	5	2	40	0
153	5	2	41	1
154	5	2	42	0
155	5	2	43	1
156	5	2	44	0
157	5	2	45	1
158	5	1	46	1
159	5	1	47	0
160	5	1	48	1
107	1	1	48	1
161	5	1	49	1
109	1	1	50	1
162	5	1	50	0
163	5	1	51	1
164	5	1	52	0
217	2	3	29	1
218	2	3	30	0
165	5	1	53	1
166	5	1	54	0
167	5	1	55	1
168	5	1	56	0
179	2	1	46	1
180	2	1	47	0
181	2	1	48	1
182	2	1	49	0
183	2	1	50	1
184	2	1	51	0
185	2	1	52	1
186	2	1	53	0
187	2	1	54	1
188	2	1	55	0
189	2	1	56	1
190	2	11	0	1
191	2	11	1	1
192	2	11	2	0
193	2	11	4	1
194	2	11	5	0
171	2	2	38	0
173	2	2	40	0
176	2	2	43	1
177	2	2	44	0
178	2	2	45	1
214	2	3	26	1
117	1	3	27	0
119	1	3	29	0
120	1	3	30	1
198	1	3	32	1
199	1	3	33	0
202	1	35	4	1
224	2	19	0	1
225	2	19	1	0
226	2	19	2	1
227	2	19	3	0
228	2	19	4	1
229	2	19	5	0
230	2	19	6	1
231	2	19	7	0
232	2	19	8	0
233	2	19	9	0
234	2	19	10	0
235	2	19	11	1
236	2	19	12	0
237	2	19	13	1
238	2	19	16	0
239	2	19	17	1
240	2	19	18	0
241	2	19	19	1
242	2	19	20	0
243	2	19	21	0
244	2	19	22	1
245	2	19	23	0
246	2	2	3	1
247	2	2	6	0
248	2	2	7	1
249	2	2	8	0
250	2	2	9	1
251	2	2	11	0
252	2	2	12	1
169	2	2	36	0
170	2	2	37	1
172	2	2	39	1
174	2	2	41	1
175	2	2	42	0
215	2	3	27	0
216	2	3	28	1
219	2	3	31	1
220	2	3	32	0
221	2	3	33	1
222	2	3	34	0
223	2	3	35	1
200	1	3	34	1
201	1	3	35	1
\.


--
-- TOC entry 4903 (class 0 OID 16428)
-- Dependencies: 218
-- Data for Name: words; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.words (word_id, kanji, meaning, pronounce, image, example) FROM stdin;
8	三	three	san	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 三
9	四	four	shi/yon	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 四
10	五	five	go	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 五
11	六	six	roku	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 六
12	七	seven	shichi/nana	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 七
13	八	eight	hachi	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 八
14	九	nine	kyuu/ku	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 九
15	十	ten	juu	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 十
16	時間	time	jikan	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 時間
17	友達	friend	tomodachi	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 友達
18	食べ物	food	tabemono	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 食べ物
19	勉強	study	benkyou	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 勉強
20	動物	animal	doubutsu	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 動物
21	言葉	language	kotoba	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 言葉
22	家族	family	kazoku	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 家族
23	映画	movie	eiga	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 映画
24	電話	telephone	denwa	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 電話
25	天気	weather	tenki	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 天気
26	旅行	travel	ryokou	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 旅行
27	心配	worry	shinpai	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 心配
28	成功	success	seikou	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 成功
29	計画	plan	keikaku	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 計画
30	問題	problem	mondai	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 問題
31	理由	reason	riyuu	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 理由
32	運動	exercise	undou	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 運動
33	夢	dream	yume	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 夢
34	体験	experience	taiken	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 体験
51	歴史	history	rekishi	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 歴史
52	教育	education	kyouiku	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 教育
53	技術	technology	gijutsu	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 技術
103	神様	God	Kami sama	https://cla.hust.edu.vn/xmedia/2015/01/cach-hoc-kanji-hieu-qua.jpg	example for 神様
0	日	sun	nichi	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 日
1	本	book	hon	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 本
2	山	mountain	yama	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 山
3	人	person	jin	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 人
4	学校	school	gakkou	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 学校
5	犬	dog	inu	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 犬
6	一	one	ichi	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 一
7	二	two	ni	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 二
35	努力	effort	doryoku	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 努力
36	総理大臣	Prime Minister	souri daishin	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 総理大臣
37	外交	diplomacy	gaikou	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 外交
38	事業	enterprise	jigyou	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 事業
39	相続	inheritance	souzoku	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 相続
40	就職	employment	shuushoku	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 就職
41	態度	attitude	taido	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 態度
42	発展	development	hatten	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 発展
43	証明	proof	shoumei	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 証明
44	連絡	contact	renraku	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 連絡
45	説明	explanation	setsumei	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 説明
46	経済	economy	keizai	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 経済
47	政治	politics	seiji	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 政治
48	環境	environment	kankyou	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 環境
49	科学	science	kagaku	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 科学
50	文化	culture	bunka	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 文化
54	社会	society	shakai	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 社会
55	医学	medicine	igaku	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 医学
56	事業	business	jigyou	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU	example for 事業
104	歌	Song	uta	https://cla.hust.edu.vn/xmedia/2015/01/cach-hoc-kanji-hieu-qua.jpg	example for 歌
105	魚	Fish	sakana	https://cla.hust.edu.vn/xmedia/2015/01/cach-hoc-kanji-hieu-qua.jpg	example for 魚
109	一人	alone	ひとり	https://i.ibb.co/7JJKT3M/368085804-824714359438645-6064086891524748455-n.gif	example for 一人
\.


--
-- TOC entry 4920 (class 0 OID 0)
-- Dependencies: 215
-- Name: app_user_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.app_user_user_id_seq', 28, true);


--
-- TOC entry 4921 (class 0 OID 0)
-- Dependencies: 219
-- Name: course_course_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.course_course_id_seq', 37, true);


--
-- TOC entry 4922 (class 0 OID 0)
-- Dependencies: 222
-- Name: course_word_items_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.course_word_items_item_id_seq', 372, true);


--
-- TOC entry 4923 (class 0 OID 0)
-- Dependencies: 223
-- Name: user_progress_user_progress_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_progress_user_progress_id_seq', 254, true);


--
-- TOC entry 4924 (class 0 OID 0)
-- Dependencies: 217
-- Name: word_word_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.word_word_id_seq', 109, true);


--
-- TOC entry 4724 (class 2606 OID 16406)
-- Name: app_user app_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT app_user_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4740 (class 2606 OID 16444)
-- Name: courses course_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT course_pkey PRIMARY KEY (course_id);


--
-- TOC entry 4744 (class 2606 OID 16466)
-- Name: course_word_items course_word_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_word_items
    ADD CONSTRAINT course_word_items_pkey PRIMARY KEY (item_id);


--
-- TOC entry 4742 (class 2606 OID 16548)
-- Name: courses unique_course_name_user_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT unique_course_name_user_id UNIQUE (created_by_user_id, course_name);


--
-- TOC entry 4726 (class 2606 OID 16518)
-- Name: app_user unique_email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT unique_email UNIQUE (email);


--
-- TOC entry 4736 (class 2606 OID 16541)
-- Name: words unique_kanji_meaning; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.words
    ADD CONSTRAINT unique_kanji_meaning UNIQUE (kanji, meaning);


--
-- TOC entry 4748 (class 2606 OID 16503)
-- Name: user_progress unique_user_course_word; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_progress
    ADD CONSTRAINT unique_user_course_word UNIQUE (user_id, course_id, word_id);


--
-- TOC entry 4728 (class 2606 OID 16511)
-- Name: app_user unique_usernam_email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT unique_usernam_email UNIQUE (username, email);


--
-- TOC entry 4730 (class 2606 OID 16516)
-- Name: app_user unique_username; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT unique_username UNIQUE (username);


--
-- TOC entry 4732 (class 2606 OID 16507)
-- Name: app_user unique_username_password; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT unique_username_password UNIQUE (username, password);


--
-- TOC entry 4734 (class 2606 OID 16509)
-- Name: app_user unique_username_password_email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT unique_username_password_email UNIQUE (username, password, email);


--
-- TOC entry 4746 (class 2606 OID 16527)
-- Name: course_word_items unique_word_course; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_word_items
    ADD CONSTRAINT unique_word_course UNIQUE (word_id, course_id);


--
-- TOC entry 4750 (class 2606 OID 16484)
-- Name: user_progress user_progress_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_progress
    ADD CONSTRAINT user_progress_pkey PRIMARY KEY (user_progress_id);


--
-- TOC entry 4738 (class 2606 OID 16435)
-- Name: words word_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.words
    ADD CONSTRAINT word_pkey PRIMARY KEY (word_id);


--
-- TOC entry 4756 (class 2620 OID 16550)
-- Name: courses trigger_delete_related_data; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_delete_related_data AFTER DELETE ON public.courses FOR EACH ROW EXECUTE FUNCTION public.delete_related_data();


--
-- TOC entry 4751 (class 2606 OID 16450)
-- Name: course_word_items course_word_item_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_word_items
    ADD CONSTRAINT course_word_item_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(course_id) ON DELETE CASCADE;


--
-- TOC entry 4752 (class 2606 OID 16455)
-- Name: course_word_items course_word_item_word_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_word_items
    ADD CONSTRAINT course_word_item_word_id_fkey FOREIGN KEY (word_id) REFERENCES public.words(word_id) ON DELETE CASCADE;


--
-- TOC entry 4753 (class 2606 OID 16490)
-- Name: user_progress user_progress_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_progress
    ADD CONSTRAINT user_progress_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(course_id) ON DELETE CASCADE;


--
-- TOC entry 4754 (class 2606 OID 16485)
-- Name: user_progress user_progress_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_progress
    ADD CONSTRAINT user_progress_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.app_user(user_id) ON DELETE CASCADE;


--
-- TOC entry 4755 (class 2606 OID 16495)
-- Name: user_progress user_progress_word_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_progress
    ADD CONSTRAINT user_progress_word_id_fkey FOREIGN KEY (word_id) REFERENCES public.words(word_id) ON DELETE CASCADE;


-- Completed on 2023-12-19 13:28:21

--
-- PostgreSQL database dump complete
--

