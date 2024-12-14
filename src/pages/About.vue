<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-card class="about-card">
          <v-card-title>
            <h1 class="about-text">About OH Chatbot</h1>
          </v-card-title>
          <v-card-text>
            <h2 class="about-text">Empowering Moderators to Combat Online Harms</h2>
            <v-row justify="space-between" align="center">
              <v-col cols="7">
                <p class="about-text justified-text" >
                  OH (Online Harms) Chatbot is designed to assist social media content moderators in their crucial mission to maintain safe and inclusive online communities. By leveraging cutting-edge AI technologies, our tool addresses some of the most pressing challenges in content moderation today, including hate speech, fake news, and hyperpartisan content.
                </p>
              </v-col>
              <v-col cols="5" class="d-flex justify-center">
                <img src="@/assets/about.svg" alt="Description of the SVG" style="max-width: 100%; height: auto;" />
              </v-col>
            </v-row>


            <v-divider class="my-4"></v-divider>

            <h2 class="about-text">Key Features</h2>
            <v-row>
              <v-col cols="5" class="d-flex justify-center">
                <img src="@/assets/features.svg" alt="Key Features Illustration" style="max-width: 100%; height: auto;" />
              </v-col>
              <v-col cols="7">
                <v-list dense>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title><strong>Hate Speech Detection</strong></v-list-item-title>
                      <ul>
                        <li>Identify harmful language using distilled LLMs tailored for classification tasks.</li>
                        <li>Provide detailed explanations to moderators, clarifying why different content qualifies as hate speech.</li>
                      </ul>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title><strong>Fake News Identification</strong></v-list-item-title>
                      <ul>
                        <li>Evaluate the credibility of shared content using LLMs.</li>
                        <li>Flag potential misinformation and highlight sources with dubious credibility.</li>
                      </ul>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title><strong>Hyperpartisan News Analysis</strong></v-list-item-title>
                      <ul>
                        <li>Detect highly polarized content and categorize it by its bias spectrum (e.g., extreme left or right).</li>
                        <li>Provide insights to moderators on how such content may influence online discussions and contribute to echo chambers.</li>
                      </ul>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>


            <v-divider class="my-4"></v-divider>

            <h2 class="about-text">How It Works</h2>

            <v-row justify="space-between" align="center">
              <v-col cols="7">
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title><strong>Automated Detection</strong></v-list-item-title>
                      <p>The AI scans incoming content in real-time, flagging potentially harmful posts or messages.</p>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title><strong>Human-AI Collaboration</strong></v-list-item-title>
                      <p>
                        Moderators receive concise summaries of input content, along with actionable insights and recommendations. This collaboration empowers human decision-makers with context-rich data.
                      </p>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title><strong>Transparent Explanations</strong></v-list-item-title>
                      <p>
                        For every item, the system provides an explanation to ensure moderators understand why the content was identified.
                      </p>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols="5" class="d-flex justify-center">
                <img src="@/assets/howto.svg" alt="How it works" style="max-width: 100%; height: auto;" />
              </v-col>
            </v-row>
            <v-divider class="my-4"></v-divider>

            <h2 class="about-text">Our Commitment</h2>
            <v-row justify="space-between" align="center">
              <v-col cols="5" class="d-flex justify-center">
                <img src="@/assets/commitment.svg" alt="Commitment" style="max-width: 100%; height: auto;" />
              </v-col>
              <v-col cols="7">
                <p class="about-text justified-text">
                  This tool is built with the understanding that social media moderation is a challenging, high-stakes task. Our goal is to reduce the burden on moderators while enhancing their ability to combat online harms effectively. With this software, we aim to create a safer, more respectful digital space for everyone.
                </p>
              </v-col>
            </v-row>

            <v-divider class="my-4"></v-divider>

            <h2 class="about-text">HYBRIDS</h2>
            <v-row justify="space-between" align="center">
              <v-col cols="6">
                <p  class="about-text justified-text">
                  This demo showcases a support tool for social media content moderators, designed to address online harms such as hate speech, fake news, and hyperpartisan news. Using advanced machine learning techniques, including distilled LLMs, the tool classifies content and provides actionable insights to help moderators make informed decisions. This demonstration is part of the <a href="https://hybridsproject.eu/" target="_blank" rel="noopener noreferrer">HYBRIDS Project</a>, an initiative focused on developing innovative solutions for societal challenges by leveraging hybrid intelligence systems.
                </p>
              </v-col>
              <v-col cols="6" class="d-flex justify-center">
                <img src="@/assets/ai.svg" alt="AI" style="max-width: 100%; height: auto;" />
              </v-col>
            </v-row>

            <v-divider class="my-4"></v-divider>

            <h2 class="about-text">Acknowledgements</h2>
            <p class="about-text justified-text">
              The authors thank the funding from the Horizon Europe research and innovation programme under the Marie Skłodowska-Curie Grant Agreement No. 101073351. The authors also thank the financial support supplied by the Consellería de Cultura, Educación, Formación Profesional e Universidades (accreditation 2019-2022 ED431G/01, ED431B 2022/33) and the European Regional Development Fund, which acknowledges the CITIC Research Center in ICT as a Research Center of the Galician University System and the project PID2022-137061OB-C21 (Ministerio de Ciencia e Innovación supported by the European Regional Development Fund). The authors also thank the funding of project PLEC2021-007662 (MCIN/AEI/10.13039/501100011033, Ministerio de Ciencia e Innovación, Agencia Estatal de Investigación, Plan de Recuperación, Transformación y Resiliencia, Unión Europea-Next Generation EU).
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

  
<script lang="ts" setup>
const goBack = () => {
  window.history.back()
}
</script>

<style scoped>
.about-card {
  margin: auto;
  padding: 24px;
}

.about-text {
  text-align: center;
}

ul {
  list-style-type: disc;
  margin: 16px 0;
  padding-left: 20px;
  text-align: left;
}

.justified-text {
  text-align: justify;
}
  </style>
  