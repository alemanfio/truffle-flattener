import { InvestmentMemo } from "./types";

export const INVESTMENT_MEMOS: Record<string, InvestmentMemo> = {
  c1: {
    why_invested:
      "NovaSenescence represents a best-in-class approach to senolytics, targeting one of the most promising mechanisms in longevity science. Their lead compound NS-401 has demonstrated a 40% reduction in senescent cell burden in Phase I trials, far exceeding the 15-20% benchmark set by competitors.\nThe founding team includes two former Novartis executives and a Stanford professor who pioneered the senolytic field. Their IP portfolio of 12 granted patents provides strong competitive moats.",
    market_opportunity:
      "The senolytic therapeutics market is projected to reach $12B by 2035, driven by aging demographics and increasing evidence that cellular senescence is a root cause of age-related diseases.\nKey market catalysts include FDA's evolving stance on aging as a treatable condition, growing pharma interest (Pfizer, Roche actively acquiring in this space), and successful clinical data from Unity Biotechnology validating the senolytic approach.",
    team_assessment:
      "CEO Dr. Elena Vasquez brings 20 years of drug development experience from Novartis, having led three compounds from Phase I to market approval. CSO Prof. Michael Torres is a pioneer in senescent cell biology with 80+ publications in Nature/Science.\nThe 28-person team includes 18 PhD-level scientists, providing exceptional research depth. Advisory board includes former FDA reviewers and Nobel laureates in cell biology.",
    risk_factors: [
      "Phase II trial outcomes uncertain - senolytic therapies in humans remain largely unproven at scale",
      "Regulatory pathway unclear as FDA has not yet established specific guidance for anti-aging therapeutics",
      "Competition from well-funded players: Unity Biotechnology ($300M raised), Senolytic Therapeutics (Pfizer-backed)",
      "Long development timeline: 5-7 years to potential market approval",
      "Manufacturing scalability of NS-401 compound at therapeutic doses not yet validated",
    ],
    thesis:
      "We believe senolytics will become a cornerstone of preventive medicine within the next decade. NovaSenescence has the strongest clinical data, deepest IP moat, and most experienced team in the space.\nOur investment targets a 7-10 year horizon with potential for 15-30x returns if NS-401 progresses through Phase II/III. Even partial success (e.g., approval for a single age-related indication) would support a $5B+ valuation. Entry at $15M pre-money represents exceptional risk/reward given the team quality and data strength.",
  },
  c2: {
    why_invested:
      "OrbitMaterials is the first company to successfully manufacture ZBLAN fiber optics in microgravity at commercially relevant scale. Their orbital foundry has produced fibers with 100x lower signal loss than terrestrial equivalents.\nSigned LOIs from three major telecom companies (combined $45M potential revenue) validate commercial demand before significant production investment.",
    market_opportunity:
      "The specialty fiber optics market alone is $4.5B annually, with space-manufactured ZBLAN addressing the premium segment ($1.2B TAM). Beyond fiber optics, the broader space manufacturing market is projected at $50B+ by 2040.\nESA and NASA are actively subsidizing early space manufacturing ventures, providing non-dilutive funding opportunities. The Artemis program creates additional demand for in-space production capabilities.",
    team_assessment:
      "CEO Jean-Pierre Dubois previously led Airbus Space Systems and brings deep aerospace industry relationships. CTO Dr. Anna Kowalski holds 5 patents in microgravity material processing.\nThe Toulouse-based team of 15 has strong ties to CNES (French space agency) and ESA, providing preferential access to launch opportunities and testing facilities.",
    risk_factors: [
      "Launch costs remain high despite SpaceX progress - economics depend on continued cost reduction",
      "Production yield in microgravity not yet proven at full commercial scale",
      "Regulatory framework for space manufacturing still evolving",
      "Customer concentration risk - three LOIs represent majority of near-term revenue",
      "Competition from Made In Space (Redwire) and other space manufacturing startups",
    ],
    thesis:
      "Space manufacturing is an inevitable multi-billion dollar industry. OrbitMaterials has first-mover advantage with proven technology and paying customers.\nWe see 20-40x return potential over 8-12 years as launch costs decline and production scales. The dual revenue streams (product sales + manufacturing-as-a-service) provide multiple paths to significant outcomes.",
  },
  c3: {
    why_invested:
      "CryoGenix has achieved a breakthrough 95% organ viability rate after cryopreservation, compared to the 20-30% rates achieved by prior approaches. Their proprietary vitrification protocol could eliminate the organ shortage crisis that causes 17 deaths daily in Europe alone.\nPartnerships with three EU transplant networks provide immediate clinical validation pathways.",
    market_opportunity:
      "The organ preservation market is $220M today but represents a fraction of the addressable opportunity. If CryoGenix enables long-term organ banking, the TAM expands to $15B+ including organ logistics, banking infrastructure, and biobanking services.\nRegulatory tailwinds: EU Organ Directive revisions actively encourage innovation in preservation technology.",
    team_assessment:
      "Founded by Dr. Klaus Schmidt, a former Max Planck Institute researcher who published the seminal paper on ice-free organ preservation. The 12-person team includes cryobiologists, bioengineers, and transplant surgeons.\nEarly stage but exceptional scientific talent density.",
    risk_factors: [
      "Pre-Seed stage - earliest stage investment in our portfolio with highest technical risk",
      "Regulatory approval for organ preservation devices requires extensive clinical validation",
      "Scaling from lab (individual organs) to commercial (thousands per year) presents engineering challenges",
      "Ethical considerations around organ banking may create regulatory headwinds",
      "Limited management team - needs experienced biotech operators as company scales",
    ],
    thesis:
      "Organ shortage is one of medicine's most tragic unsolved problems. CryoGenix's technology, if validated, represents a paradigm shift worth $10B+.\nAt Pre-Seed valuation of $5M, the asymmetric risk/reward is compelling. We expect to co-invest in subsequent rounds. Even licensing the technology to existing transplant networks could generate substantial returns.",
  },
  c4: {
    why_invested:
      "LunarLogistics is building critical infrastructure for the cislunar economy. Their Robotic Transfer Vehicles (RTVs) are the most advanced autonomous cargo systems designed for Earth orbit to lunar surface operations.\nESA and NASA contracts already secured for initial missions provide revenue visibility and de-risk the technology. The company is positioned as the 'FedEx of space' for the lunar economy.",
    market_opportunity:
      "The cislunar economy is projected at $100B+ by 2040 (Northern Sky Research). Every lunar mission requires logistics support, creating recurring revenue opportunities.\nArtemis program alone plans 50+ missions requiring cargo transport. Commercial lunar activities (mining, tourism, research stations) will multiply demand further.",
    team_assessment:
      "CEO Dr. Hans Weber led the ATV (Automated Transfer Vehicle) program at ESA, the most successful autonomous cargo spacecraft in history. CTO brings SpaceX Falcon 9 landing system experience.\nThe 45-person Bremen team has unmatched expertise in autonomous space systems. Strong ESA institutional relationships provide ongoing contract pipeline.",
    risk_factors: [
      "Artemis program timeline delays could push back revenue milestones",
      "Technical complexity of autonomous lunar landing remains high",
      "Government contract dependence in early years",
      "Competition from SpaceX Starship and Blue Origin lunar lander programs",
      "Capital intensive - will require significant follow-on funding",
      "Geopolitical risks affecting international space cooperation",
    ],
    thesis:
      "Cislunar logistics is a natural monopoly opportunity - first reliable provider captures the market. LunarLogistics has the team, technology, and contracts to be that provider.\nAt $25M valuation with secured government contracts, we see 10-25x return potential. The infrastructure play provides multiple revenue streams and strategic value that could attract acquisition interest from major aerospace primes.",
  },
  c5: {
    why_invested:
      "EpigenReset's platform for epigenetic reprogramming represents the cutting edge of longevity science. Their proprietary epigenetic clock technology (3 granted patents) enables precise measurement and modulation of biological aging at the cellular level.\nFounded by Harvard Wyss Institute researchers who published breakthrough work on partial cellular reprogramming.",
    market_opportunity:
      "Epigenetic therapies target the $170B regenerative medicine market, with the broader longevity economy at $600B+ globally.\nThe field is at an inflection point: Altos Labs ($3B raised), Calico (Alphabet-backed), and Retro Biosciences (Sam Altman-backed) have validated the category. EpigenReset's differentiated approach targets tissue-specific reprogramming, avoiding the tumor risk of full reprogramming.",
    team_assessment:
      "Co-founders Dr. Sarah Mitchell and Dr. James Park bring complementary expertise - Mitchell in epigenetics (50+ publications) and Park in drug delivery systems. Both trained under George Church at Harvard.\nThe 20-person Cambridge UK team includes computational biologists, chemists, and in-vivo pharmacologists. Strong academic collaborations with Cambridge University and the Babraham Institute.",
    risk_factors: [
      "Epigenetic reprogramming in humans is largely unproven - translational risk is significant",
      "Competition from extremely well-funded rivals (Altos Labs: $3B, Calico: $2.5B+)",
      "IP landscape complex with overlapping patent claims in the Yamanaka factor space",
      "Long development timeline (10+ years to potential therapeutic approval)",
      "Potential for unexpected side effects from epigenetic modifications",
    ],
    thesis:
      "Epigenetic reprogramming is likely the most transformative therapeutic modality of the 21st century. EpigenReset's tissue-specific approach solves the key safety concern (tumor risk) that limits competitors.\nAt $12M Seed valuation, we have early-stage entry into a category where successful companies will be worth $1B+. The Harvard pedigree and patent portfolio provide strong foundations for follow-on fundraising and potential pharma partnerships.",
  },
  c6: {
    why_invested:
      "AstroFarm's closed-loop bio-regenerative life support systems are essential technology for sustained human presence in space. Their systems produce food, recycle water, and generate oxygen with 98% efficiency.\nDual-use applications for Earth-based vertical farming in extreme environments (deserts, Arctic, disaster zones) provide a near-term revenue bridge while space applications mature.",
    market_opportunity:
      "The space life support market grows with every human space mission - projected $8B by 2035. The terrestrial controlled environment agriculture market is $30B and growing 12% annually.\nNASA's Human Landing System program requires advanced life support for lunar habitation. ESA's Moon Village initiative is a direct customer for AstroFarm's technology.",
    team_assessment:
      "CEO Dr. Lisa van den Berg is a leading expert in bio-regenerative systems from Wageningen University, the world's top agricultural research institution. CTO brings 15 years of life support experience from ESA.\nThe 18-person team combines expertise in plant science, systems engineering, and space systems design.",
    risk_factors: [
      "Space habitat deployment timelines are uncertain and subject to program delays",
      "Terrestrial applications face competition from established vertical farming companies",
      "Technology readiness level needs advancement for space-rated certification",
      "Revenue dependent on government space program timelines",
      "Scaling manufacturing for space-qualified systems is capital intensive",
    ],
    thesis:
      "Every long-duration space mission needs life support - AstroFarm is building the essential technology. The dual-use strategy (space + terrestrial) reduces risk and provides near-term revenue.\nAt $7M Seed valuation, the terrestrial vertical farming applications alone could justify a $50M+ outcome. Space applications provide asymmetric upside to $500M+ if the lunar economy develops as projected.",
  },
};
