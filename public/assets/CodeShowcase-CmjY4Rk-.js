import{t as e}from"./activity-Ce7DAa2f.js";import{F as t,I as n,i as r,o as i,s as a,u as o}from"./index-CrKXUxmy.js";var s=i(`FolderGit2`,[[`path`,{d:`M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5`,key:`1w6njk`}],[`circle`,{cx:`13`,cy:`12`,r:`2`,key:`1j92g6`}],[`path`,{d:`M18 19c-2.8 0-5-2.2-5-5v8`,key:`pkpw2h`}],[`circle`,{cx:`20`,cy:`19`,r:`2`,key:`1obnsp`}]]),c=i(`Play`,[[`polygon`,{points:`6 3 20 12 6 21 6 3`,key:`1oa8hb`}]]),l=n(t(),1);function u(e,t=20,n=4e3){let[r,i]=(0,l.useState)(0),[a,o]=(0,l.useState)(``),[s,c]=(0,l.useState)(!1);return(0,l.useEffect)(()=>{let a,s=e[r],l=0;o(``),c(!1);let u=()=>{if(l<s.length){let e=s[l],n=t;e===`
`?n=t*3:(e===`;`||e===`,`)&&(n=t*2.5),o(t=>t+e),l++,a=setTimeout(u,n)}else c(!0),a=setTimeout(()=>{i(t=>(t+1)%e.length)},n)};return a=setTimeout(u,500),()=>clearTimeout(a)},[r,e,t,n]),{displayedText:a,currentBlockIndex:r,isComplete:s}}var d=o(),f=[{name:`ParameterTelemetry.tsx`,lang:`typescript`,label:`React + TS Telemetry Monitor`,code:`// React + TS Component managing parameter monitoring
interface ParamViewProps {
  parameterId: string;
  onAlertTrigger: (value: number) => void;
}

export const ParameterTelemetry: React.FC<ParamViewProps> = ({
  parameterId,
  onAlertTrigger
}) => {
  const [data, setData] = useState<number[]>([]);
  
  useEffect(() => {
    const socket = connectTelemetry(parameterId);
    socket.on("update", (val: number) => {
      setData((prev) => [...prev.slice(-30), val]);
      if (val > 8.5) onAlertTrigger(val);
    });
    return () => socket.disconnect();
  }, [parameterId]);
  
  return <TelemetryChart data={data} threshold={8.5} />;
};`},{name:`regulatoryApi.ts`,lang:`typescript`,label:`RTK Query API Endpoint Gates`,code:`// RTK Query API slice managing government permits
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const regulatoryApi = createApi({
  reducerPath: 'regulatoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/doe' }),
  tagTypes: ['Permits'],
  endpoints: (builder) => ({
    getPermits: builder.query<Permit[], void>({
      query: () => '/permits/active',
      providesTags: ['Permits'],
    }),
    approvePermit: builder.mutation<Permit, string>({
      query: (permitId) => ({
        url: \`/permits/\${permitId}/approve\`,
        method: 'POST',
      }),
      invalidatesTags: ['Permits'],
    }),
  }),
});`},{name:`complianceSlice.ts`,lang:`typescript`,label:`Redux State Store Slice`,code:`// Redux State reducer managing active compliance filters
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ComplianceState {
  activeNode: string | null;
  filters: Record<string, string>;
}

const initialState: ComplianceState = {
  activeNode: null,
  filters: {},
};

export const complianceSlice = createSlice({
  name: 'compliance',
  initialState,
  reducers: {
    setNode: (state, action: PayloadAction<string>) => {
      state.activeNode = action.payload;
    },
    resetFilters: (state) => {
      state.filters = {};
    }
  }
});`}];function p(){let[t,n]=(0,l.useState)(0),{displayedText:i}=u(f.map(e=>e.code),12,6e3),o=e=>{n(e)};return(0,d.jsx)(`section`,{id:`code`,className:`relative min-h-screen py-32 bg-cream overflow-hidden px-6 md:px-12 flex items-center bg-noise border-b border-border-cream`,children:(0,d.jsxs)(`div`,{className:`max-w-6xl mx-auto w-full relative z-10`,children:[(0,d.jsxs)(`div`,{className:`mb-20 text-center lg:text-left flex flex-col lg:flex-row lg:items-end justify-between gap-6`,children:[(0,d.jsxs)(`div`,{className:`max-w-xl`,children:[(0,d.jsxs)(`div`,{className:`flex items-center justify-center lg:justify-start gap-2 mb-4`,children:[(0,d.jsx)(`span`,{className:`w-1.5 h-1.5 rounded-full bg-burnt-orange`}),(0,d.jsx)(`span`,{className:`text-[11px] font-bold uppercase tracking-[0.2em] text-burnt-orange font-sans`,children:`COMPILATION MONITOR & CORE ENGINE`})]}),(0,d.jsxs)(`h2`,{className:`text-4xl md:text-6xl font-display font-light tracking-tight text-deep-black`,children:[`Code `,(0,d.jsx)(`span`,{className:`italic font-normal text-burnt-orange`,children:`Showcase`})]})]}),(0,d.jsx)(`p`,{className:`text-sm text-body max-w-sm lg:text-right font-sans font-light leading-relaxed`,children:`Clean, modular snippets representing enterprise architectures built on top of TypeScript, RTK Query, and state caches.`})]}),(0,d.jsxs)(a.div,{initial:{opacity:0,y:40},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:`-50px`},transition:{duration:.9},className:`w-full bg-card-white rounded-2xl overflow-hidden shadow-minimal border border-border-cream flex flex-col h-[520px]`,children:[(0,d.jsxs)(`div`,{className:`bg-cream px-6 py-4 flex items-center justify-between border-b border-border-cream select-none shrink-0`,children:[(0,d.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,d.jsx)(`span`,{className:`w-2.5 h-2.5 rounded-full bg-deep-black/10 border border-border-cream block`}),(0,d.jsx)(`span`,{className:`w-2.5 h-2.5 rounded-full bg-deep-black/10 border border-border-cream block`}),(0,d.jsx)(`span`,{className:`w-2.5 h-2.5 rounded-full bg-deep-black/10 border border-border-cream block`})]}),(0,d.jsxs)(`div`,{className:`flex items-center gap-2 font-sans text-[10px] text-secondary-gray font-semibold uppercase tracking-wider`,children:[(0,d.jsx)(r,{size:12,className:`text-burnt-orange`}),(0,d.jsx)(`span`,{children:`live-compiler.ts`})]}),(0,d.jsxs)(`div`,{className:`flex items-center gap-2 text-[10px] text-muted/60 font-sans select-none font-medium`,children:[(0,d.jsx)(e,{size:12,className:`text-burnt-orange animate-pulse`}),(0,d.jsx)(`span`,{children:`STATUS: STABLE`})]})]}),(0,d.jsxs)(`div`,{className:`bg-cream/40 px-4 py-2.5 flex items-center gap-1.5 border-b border-border-cream overflow-x-auto shrink-0 scrollbar-none select-none`,children:[(0,d.jsxs)(`div`,{className:`flex items-center gap-1.5 text-muted/50 mr-4 pl-2 font-sans text-[10px] font-bold uppercase tracking-wider`,children:[(0,d.jsx)(s,{size:12,className:`text-burnt-orange`}),(0,d.jsx)(`span`,{children:`src / slices /`})]}),f.map((e,n)=>{let r=t===n;return(0,d.jsxs)(`button`,{onClick:()=>o(n),className:`px-4 py-2 rounded-lg text-[10px] font-mono tracking-wider transition-all duration-300 border focus:outline-none flex items-center gap-2 ${r?`bg-deep-black text-cream border-deep-black font-semibold`:`bg-card-white text-secondary-gray border-border-cream/80 hover:text-burnt-orange`}`,children:[(0,d.jsx)(`span`,{className:`w-1.5 h-1.5 rounded-full block ${r?`bg-burnt-orange animate-pulse`:`bg-secondary-gray/20`}`}),e.name]},e.name)})]}),(0,d.jsxs)(`div`,{className:`p-6 md:p-8 flex-1 overflow-y-auto font-mono text-[12px] text-left bg-card-white relative selection:bg-burnt-orange/10 leading-relaxed scrollbar-none`,children:[(0,d.jsxs)(`div`,{className:`absolute top-3 right-5 text-[9px] text-muted/40 select-none flex items-center gap-1.5 font-bold font-sans tracking-wide`,children:[(0,d.jsx)(c,{size:10,className:`text-burnt-orange animate-pulse`}),(0,d.jsx)(`span`,{children:`LIVE CORE VIEW`})]}),(0,d.jsxs)(`div`,{className:`space-y-0.5`,children:[(e=>e.split(`
`).map((e,t)=>e.trim().startsWith(`//`)?(0,d.jsx)(`div`,{className:`text-muted/50 italic select-none font-mono`,children:e},t):(0,d.jsx)(`div`,{className:`min-h-[1.5em] font-mono text-deep-black`,children:e.split(/(\s+|\(|\)|\{|\}|\[|\]|<|>|=|\+|-|;|,|\.|\/|\`|\:)/).map((e,t)=>[`const`,`let`,`export`,`import`,`from`,`return`,`interface`,`extends`,`as`,`type`,`default`,`function`].includes(e)?(0,d.jsx)(`span`,{className:`text-burnt-orange font-semibold font-mono`,children:e},t):[`string`,`number`,`void`,`boolean`,`FC`,`React`,`PayloadAction`].includes(e)?(0,d.jsx)(`span`,{className:`text-deep-black font-bold font-mono`,children:e},t):e.startsWith(`"`)||e.startsWith(`'`)||e.startsWith("`")?(0,d.jsx)(`span`,{className:`text-secondary-gray font-mono italic`,children:e},t):[`useState`,`useEffect`,`createApi`,`fetchBaseQuery`,`createSlice`].includes(e)?(0,d.jsx)(`span`,{className:`text-burnt-orange/80 font-bold font-mono`,children:e},t):(0,d.jsx)(`span`,{className:`text-deep-black font-mono`,children:e},t))},t)))(i),(0,d.jsx)(a.span,{animate:{opacity:[1,0,1]},transition:{repeat:1/0,duration:.8},className:`inline-block w-1.5 h-4 bg-burnt-orange ml-1.5 align-middle`})]})]})]})]})})}export{p as default};