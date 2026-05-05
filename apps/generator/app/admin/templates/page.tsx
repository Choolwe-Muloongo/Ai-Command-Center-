import { templates } from "@packages/module-registry";
export default function TemplateSelector() { return <main><h2>Template Selector</h2><pre>{JSON.stringify(templates, null, 2)}</pre></main>; }
