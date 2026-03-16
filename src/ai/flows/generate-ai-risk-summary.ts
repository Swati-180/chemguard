'use server';
/**
 * @fileOverview An AI agent that generates an overall risk summary for ChemGuard AI operations.
 *
 * - generateAiRiskSummary - A function that handles the AI risk summary generation process.
 * - GenerateAiRiskSummaryInput - The input type for the generateAiRiskSummary function.
 * - GenerateAiRiskSummaryOutput - The return type for the generateAiRiskSummary function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateAiRiskSummaryInputSchema = z.object({
  criticalAlertsCount: z.number().describe('The current number of critical alerts.').default(0),
  warningAlertsCount: z.number().describe('The current number of warning alerts.').default(0),
  infoAlertsCount: z.number().describe('The current number of informational alerts.').default(0),
  complianceScore: z.number().min(0).max(100).describe('The current compliance score (0-100). Higher is better.').default(100),
  suspiciousActivityCount: z.number().describe('The number of suspicious activities detected.').default(0),
  offlineDevicesCount: z.number().describe('The number of IoT devices currently offline.').default(0),
  tamperingAlertsCount: z.number().describe('The number of tampering alerts detected.').default(0),
  activeShipmentsCount: z.number().describe('The number of currently active shipments.').default(0),
  recentUnusualActivityDescription: z.string().optional().describe('A brief description of any recent unusual activity across systems (e.g., from chemical usage trends, shipment movements, or map anomalies).'),
});
export type GenerateAiRiskSummaryInput = z.infer<typeof GenerateAiRiskSummaryInputSchema>;

const GenerateAiRiskSummaryOutputSchema = z.object({
  riskLevel: z.enum(['Low', 'Medium', 'High']).describe('The overall risk level for the operation.'),
  explanation: z.string().describe('A concise explanation of the factors contributing to the current risk level.'),
});
export type GenerateAiRiskSummaryOutput = z.infer<typeof GenerateAiRiskSummaryOutputSchema>;

export async function generateAiRiskSummary(input: GenerateAiRiskSummaryInput): Promise<GenerateAiRiskSummaryOutput> {
  return generateAiRiskSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAiRiskSummaryPrompt',
  input: { schema: GenerateAiRiskSummaryInputSchema },
  output: { schema: GenerateAiRiskSummaryOutputSchema },
  prompt: `You are an expert security analyst for the ChemGuard AI system, specializing in chemical and shipment security. Your task is to provide a concise overall risk summary for the entire operation (Low, Medium, or High) along with a clear explanation of the contributing factors.

Consider the following operational data:
- Number of Critical Alerts: {{{criticalAlertsCount}}}
- Number of Warning Alerts: {{{warningAlertsCount}}}
- Number of Info Alerts: {{{infoAlertsCount}}}
- Compliance Score: {{{complianceScore}}} (0-100, higher is better)
- Suspicious Activity Detections: {{{suspiciousActivityCount}}}
- Offline IoT Devices: {{{offlineDevicesCount}}}
- Tampering Alerts: {{{tamperingAlertsCount}}}
- Active Shipments: {{{activeShipmentsCount}}}
{{#if recentUnusualActivityDescription}}
- Recent Unusual Activity: {{{recentUnusualActivityDescription}}}
{{/if}}

Based on this data, analyze the overall security posture. Prioritize critical alerts, tampering incidents, low compliance scores, and a high number of offline devices or suspicious activities as indicators of higher risk. Conversely, high compliance scores and low alert counts indicate lower risk.

Provide your analysis in a JSON object with the following structure:
`,
});

const generateAiRiskSummaryFlow = ai.defineFlow(
  {
    name: 'generateAiRiskSummaryFlow',
    inputSchema: GenerateAiRiskSummaryInputSchema,
    outputSchema: GenerateAiRiskSummaryOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('AI did not return a valid risk summary.');
    }
    return output;
  },
);
