use crate::engine::rules::ids::Techniques;
use crate::engine::rules::rule::Rule;
use crate::engine::rules::wcag_base::{Criteria, Guideline, Principle};
use scraper::Selector;
use std::collections::BTreeMap;

// todo: validate each element and add a shape that can prevent repitiion
lazy_static! {
    /// a list of rules that should be applied for WCAG1
    pub static ref RULES_A: BTreeMap<&'static str, Vec<Rule>> =
        vec![
            // empty titles
            ("title", Vec::from([
                Rule::new(Techniques::H25, Criteria::Error, Principle::Operable, Guideline::Navigable, |_rule, nodes, _css_parser| {
                    (!nodes.is_empty(), "1.NoTitleEl", Default::default())
                }),
                Rule::new(Techniques::H25, Criteria::Error, Principle::Understandable, Guideline::Predictable, |_rule, nodes, _css_parser| {
                    (nodes.is_empty() || nodes[0].html().is_empty(), "2", Default::default())
                }),
            ])),
            // missing label
            ("form", Vec::from([
                Rule::new(Techniques::H32, Criteria::Error, Principle::Operable, Guideline::Predictable, |_rule, nodes, _css_parser| {
                    // check the first element for now
                    let mut valid = false;

                    for ele in nodes {
                        // todo: static selectors
                        let selector = unsafe { Selector::parse("button[type=submit]").unwrap_unchecked() };
                        valid = match ele.select(&selector).next() {
                            Some(_) => true,
                            _ => false
                        };
                    }

                    (valid, "2", Default::default())
                }),
            ]))
        ]
        .into_iter()
        .collect();
}