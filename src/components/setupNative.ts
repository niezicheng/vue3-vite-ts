import type { App } from 'vue';
import { create, NButton } from 'naive-ui';

const compList = [NButton];

export function setupNaive(app: App) {
  const components: any = [];
  compList.forEach(comp => {
    components.push(comp?.name || comp?.displayName, comp);
  });

  const naive = create({
    components
  });

  app.use(naive);
}
