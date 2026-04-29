import yaml from 'js-yaml';

/**
 * 加载工具索引
 * @returns {Promise<Array>} 工具列表
 */
export async function loadToolIndex() {
  try {
    const response = await fetch('/tools/index.yaml');
    const text = await response.text();
    const data = yaml.load(text, {
      schema: yaml.FAILSAFE_SCHEMA,
      constructScalar: (node) => node.value
    });
    return data.tools || [];
  } catch (error) {
    console.error('加载工具索引失败:', error);
    return [];
  }
}

/**
 * 加载工具详情
 * @param {string} toolId 工具ID
 * @returns {Promise<Object>} 工具详情
 */
export async function loadToolInfo(toolId) {
  try {
    const response = await fetch(`/tools/${toolId}/info.yaml`);
    const text = await response.text();
    return yaml.load(text, {
      schema: yaml.FAILSAFE_SCHEMA,
      constructScalar: (node) => node.value
    });
  } catch (error) {
    console.error('加载工具信息失败:', error);
    return null;
  }
}

/**
 * 加载工具代码文件
 * @param {string} toolId 工具ID
 * @param {string} filePath 文件路径
 * @returns {Promise<string>} 代码内容
 */
export async function loadToolCode(toolId, filePath) {
  try {
    const response = await fetch(`/tools/${toolId}/${filePath}`);
    return await response.text();
  } catch (error) {
    console.error('加载工具代码失败:', error);
    return '';
  }
}
